'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodentRuntime = require('nodent-runtime');

var _nodentRuntime2 = _interopRequireDefault(_nodentRuntime);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _provider = require('./provider');

var _provider2 = _interopRequireDefault(_provider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Provider = function (_BaseProvider) {
  _inherits(Provider, _BaseProvider);

  function Provider() {
    _classCallCheck(this, Provider);

    return _possibleConstructorReturn(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).apply(this, arguments));
  }

  _createClass(Provider, [{
    key: 'endpoint',
    value: function endpoint() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          query = _ref.query,
          protocol = _ref.protocol;

      var params = this.options.params;


      var paramString = this.getParamString(_extends({}, params, {
        format: 'json',
        q: query,
        language: this.options['accept-language']
      }));

      return protocol + '//api.opencagedata.com/geocode/v1/json?' + paramString;
    }
  }, {
    key: 'parse',
    value: function parse(_ref2) {
      var data = _ref2.data;

      var updatedResults = [];
      data.results.forEach(function (r) {
        if (r.bounds) {
          updatedResults.push({
            x: r.geometry.lng,
            y: r.geometry.lat,
            label: r.formatted,
            bounds: [[parseFloat(r.bounds.southwest.lat), parseFloat(r.bounds.southwest.lng)], // s, w
            [parseFloat(r.bounds.northeast.lat), parseFloat(r.bounds.northeast.lng)]],
            raw: r
          });
        }
      });
      return updatedResults;
    }
  }, {
    key: 'search',
    value: function search(_ref3) {
      return new Promise(function ($return, $error) {
        var query, protocol, url, request, json, parsedData;
        query = _ref3.query;

        protocol = ~location.protocol.indexOf('http') ? location.protocol : 'https:';
        url = this.endpoint({ query: query, protocol: protocol });

        return fetch(url).then(function ($await_1) {
          request = $await_1;
          return request.json().then(function ($await_2) {
            json = $await_2;
            parsedData = this.parse({ data: json });

            return $return(parsedData);
          }.$asyncbind(this, $error), $error);
        }.$asyncbind(this, $error), $error);
      }.$asyncbind(this));
    }
  }]);

  return Provider;
}(_provider2.default);

exports.default = Provider;