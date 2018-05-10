const express      = require('express')
const bodyParser   = require('body-parser')
const morgan       = require('morgan')
const nconf        = require('nconf')
const consign      = require('consign')
const passport     = require('passport')

const errorHandler = require('../app/handlers/error')

let properties

if (process.env.NODE_ENV == 'homolog') {
  properties = './config/env/homolog.json';
} else {
  properties = './config/env/dev.json';
}

nconf
  .argv()
  .env({ separator: '__' })
  .file(properties)

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());

consign({ cwd: 'app' })
  .then('models')
	.then('services')
	.then('controllers')
  .then('routes')
  .into(app)

app.use(errorHandler.handler);

module.exports = app



