'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mockServer = require('./mock-decorator.js');
const path = require('path');
const cors = require('cors');
const pg = require('pg');

require('dotenv').config()

const config = {
  user: process.env.User, //env var: PGUSER 
  database: process.env.Database, //env var: PGDATABASE 
  password: process.env.Password, //env var: PGPASSWORD 
  host: process.env.Host, // Server hosting the postgres database 
  port: process.env.Dataport, //env var: PGPORT 
  max: 10, // max number of clients in the pool 
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed 
};

const app = express();
const pool = new pg.Pool(config);

app.use(cors());
app.use(bodyParser.json());


if (process.env.APP_ENV === 'MOCK') {
    const forceSSL = () => {
        return (req, res, next) => {
            if (req.headers['x-forwarded-proto'] !== 'https') {
                return res.redirect(
                    ['https://', req.get('Host'), req.url].join('')
                );
            }
            next();
        }
    };

    app.use(forceSSL());

    app.use(express.static(__dirname + '/dist'));
    mockServer(app);
} else {
    app.use(express.static(__dirname + '/src/app'));
    mockServer(app);
}

app.listen(process.env.PORT, () => console.log('server is running ' + process.env.Port ));
