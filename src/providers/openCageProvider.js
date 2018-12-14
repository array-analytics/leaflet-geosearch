import BaseProvider from './provider';

export default class Provider extends BaseProvider {
  endpoint({ query, protocol } = {}) {
    const { params } = this.options;

    const paramString = this.getParamString({
      ...params,
      format: 'json',
      q: query,
      language: this.options['accept-language'],
    });

    return `${protocol}//api.opencagedata.com/geocode/v1/json?${paramString}`;
  }

  parse({ data }) {
    try{
    return data.results.map(r => (
      {
      x: r.geometry.lng,
      y: r.geometry.lat,
      label: r.formatted,
      bounds: r.bounds ? [
        [parseFloat(r.bounds.southwest.lat), parseFloat(r.bounds.southwest.lng)], // s, w
        [parseFloat(r.bounds.northeast.lat), parseFloat(r.bounds.northeast.lng)], // n, e
      ] : [],
      raw: r,
    }
  ));
  }catch(e){
    console.error("the error", e);
  }
  }

  async search({ query }) {
    // eslint-disable-next-line no-bitwise
    const protocol = ~location.protocol.indexOf('http') ? location.protocol : 'https:';
    const url = this.endpoint({ query, protocol });

    const request = await fetch(url);
    const json = await request.json();
	console.log("the result0", json);
	var parsedData = this.parse({ data: json });
	console.log("the result5", parsedData
	);
    return parsedData;
  }
}
