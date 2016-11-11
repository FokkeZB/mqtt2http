# MQTT 2 HTTP

Forward MQTT messages to HTTP.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

This simple, but highly configurable script subscribes to one or more MQTT topics and makes a HTTP request for every message it receives. This allows you to use MQTT messages as trigger for APIs that don't support MQTT via services like [Zapier's Webhook](https://zapier.com/zapbook/webhook/) or [IFTTT's Maker Channel](https://ifttt.com/maker).

## Deploy
Deploy directly to [Heroku](https://heroku.com/deploy) or clone the repository and run it in any current [Node.js](https://nodejs.org/en/) environment:

* [Yarn](https://yarnpkg.com/): `yarn && yarn run start`
* [NPM](https://www.npmjs.com/): `npm install && npm start`

## Test
To test you can use a public MQTT broker like `mqtt://test.mosquitto.org` and the `DEBUG_*` variables. Rename [debug.env](debug.env) to `.env` for an example that publishes a JSON stringified object with the current time every 5 seconds and skips the actual request.

## Environment Variables
Configure the MQTT connection and topic to subscribe to and the HTTP requests to make via environment variables. The script uses [dotenv](https://www.npmjs.com/package/dotenv) to load these from a file if you like. Be aware that some of the variables can or must be formatted as JSON strings.

The following variables can be set:

| Variable         | Required | Description                                                                                                                                                                                                                                |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `MQTT_URL`       | Yes      | MQTT broker URL to connect to. See https://www.npmjs.com/package/mqtt#connect                                                                                                                                                              |
| `MQTT_USERNAME`  | No       | MQTT broker username. See https://www.npmjs.com/package/mqtt#mqttclientstreambuilder-options                                                                                                                                               |
| `MQTT_PASSWORD`  | No       | MQTT broker password. See https://www.npmjs.com/package/mqtt#mqttclientstreambuilder-options                                                                                                                                               |
| `MQTT_CONNECT`   | No       | MQTT broker connection options. Formatted as JSON String. See https://www.npmjs.com/package/mqtt#mqttclientstreambuilder-options                                                                                                           |
| `MQTT_TOPIC`     | Yes      | MQTT topic(s) to subscribe. Either a single topic or an Array or Object formatted as JSON String. See https://www.npmjs.com/package/mqtt#subscribe                                                                                         |
| `MQTT_SUBSCRIBE` | No       | MQTT subscribe options. Formatted as JSON String. See https://www.npmjs.com/package/mqtt#subscribe                                                                                                                                         |
| `HTTP_URL`       | Yes      | HTTP request URL. Compiled as Handlebars template and executed with the `topic` and `message` as data. See https://www.npmjs.com/package/request#requestoptions-callback and http://handlebarsjs.com/                                      |
| `HTTP_JSON`      | No       | Set to a truthy string (e.g. `1`) to set the request option `json` to `true` and `body` to an object with the `topic` and `message` (as object, if available). See https://www.npmjs.com/package/request#requestoptions-callback           |
| `HTTP_REQUEST`   | No       | HTTP request options. Compiled as Handlebars template and executed with the `topic` and `message` as data. Use the `stringify` helper if needed to output a JSON String. See https://www.npmjs.com/package/request#requestoptions-callback |
| `DEBUG_LOG`      | No       | Set to a truthy string (e.g. `1`) to write debug logs to the console.                                                                                                                                                                      |
| `DEBUG_PUBLISH`  | No       | Set to a integer string (e.g. `5000`) to publish dummy topics to the broker at this interval.                                                                                                                                              |
| `DEBUG_MESSAGE`  | No       | Message to publish. Defaults to a JSON formatted object with `time` set to `Date.toString()`.                                                                                                                                              |
| `DEBUG_NOOP`     | No       | Set to a truthy string (e.g. `1`) to not actually make the HTTP request.                                                                                                                                                                   |

