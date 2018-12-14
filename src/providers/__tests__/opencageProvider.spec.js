import test from 'ava';
import Provider from '../openCageProvider';

test('Can fetch results with OpenCage', async (t) => {
  const provider = new Provider({
    params: {
      key: process.env.OPENCAGE_API_KEY,
      no_annotations: 1
    },
  });

  const results = await provider.search({ query: 'netherlands' });
  const result = results[0];

  t.truthy(result.label);
  t.log(result)
  t.true(result.x > 5 && result.x < 6);
  t.true(result.y > 50 && result.y < 55);
  t.true(result.bounds[0][0] > result.bounds[0][1]);
  t.true(result.bounds[1][0] > result.bounds[1][1]);
  t.true(result.bounds[0][0] < result.bounds[1][0]);
  t.true(result.bounds[0][1] < result.bounds[1][1]);
});

test('Can get localized results', async (t) => {
  const provider = new Provider({
    params: {
      'key': process.env.OPENCAGE_API_KEY,
      'accept-language': 'nl',
      no_annotations: 1
    },
  });

  const results = await provider.search({ query: 'netherlands' });
  t.log("first results:", results[0]);
  t.true(results[0].label === 'Nederland');
});
