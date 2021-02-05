const express = require('express');
const app = express();

const services = [
  'ansible',
  'cost_management',
  'insights',
  'migrations',
  'openshift',
  'settings',
  'smart_management',
  'subscriptions',
  'user_preferences',
  'internal'
];
const entitlements = services.reduce((acc, cur) => {
  acc[cur] = { is_entitled: true, is_trial: false };
  return acc;
}, {});

app.get('/api/entitlements/v1/services', (_, res) => res.json(entitlements));

const rbac = {
    'meta': {'count': 30, 'limit': 1000, 'offset': 0},
    'links': {
        'first': '/api/rbac/v1/access/?application=&format=json&limit=1000&offset=0',
        'next': null,
        'previous': null,
        'last': '/api/rbac/v1/access/?application=&format=json&limit=1000&offset=0',
    },
    'data': [
        {'resourceDefinitions': [], 'permission': 'insights:*:*'}
    ]
};

app.get('/api/rbac/v1/access/', (_, res) => res.json(rbac));

app.listen(3000, () => console.log('Listening on 3000'));

