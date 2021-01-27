# standalone-crc
Run cloud.redhat.com locally. Uses keycloak in a docker container for auth and a mock API server for RBAC/Entitlements.

## Running
1. `git submodule update --init && yarn install`
2. `yarn build:chrome` (or for developing chrome, `yarn start:chrome`)
3. `yarn start:backend`
4. `yarn start:frontend`

You can login with `user` / `user` or visit http://localhost:8180 and create a new user yourself.

## How
### Backend
Auth is difficult to mock, so `insights-auth` uses keycloak in a docker container with a configured `realm-export.json` that mirrors cloud.redhat.com. Thanks to https://github.com/RedHatInsights/analytics-pipeline for the proper config.

The API is simple to mock and returns 2 static responses to give all entitlments and roles.

### Frontend
cloud.redhat.com uses ESI tags to inject `insights-chrome.js` which provides chroming, user auth, and user tracking. `landing-page-frontend` provides 404.html and silent-sso-check.html, the latter of which is required for user auth. `cloud-services-config` provides the `main.yml` for the sidenav.

The ESI tags are replaced with their templates using `html-replace-webpack-plugin`. API requests are proxied using webpack.devServer.proxy. `insights-chrome` has been modified to [use Webpack 5](https://github.com/redallen/insights-chrome/commit/8a80dd22f9ec2e985e3dc00fab7f907a010b3ffa) and [allow http auth](https://github.com/redallen/insights-chrome/commit/de14093bd20105042f48627466d4fba17825a890).

The chrome, landing page HTML, and main.yml are all exposed with a `CopyPlugin`.

## Why
For offline development and standalone deployments, and a nice learning experience.

