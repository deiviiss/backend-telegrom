import express from 'express';
import http from 'http'
import { socketConnect } from './socket.js';
import morgan from 'morgan';

import conectionDB from './db.js';
import apiRoutes from './routes/index.js';
import { config } from './config.js';

import cors from 'cors';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path'
import chalk from 'chalk'

// Alternative for __dirname in Node.js when using ES6 modules
const __dirname = dirname(fileURLToPath(import.meta.url));

// conection to db
const URI = config.dbUrl;
conectionDB(URI)
  .then(() => console.log(chalk.blue('[db] Connected Success')))
  .catch(err => console.error(chalk.red(`[db] ${err}`)))

//inizializations
const app = express();
const server = http.Server(app)

//settings
app.set('port', process.env.PORT || 3001); //server port

app.use(cors())

//middlewares
app.use(morgan('dev'));// server messages
app.use(express.urlencoded({ extended: false })); // express read data
app.use(express.json()); // express read json

// socket connection
socketConnect(server)

//routes
apiRoutes(app)

//static -files - public
// app.use('/app', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')))

//starting server
server.listen(app.get('port'), () => {
  console.log('Server on port ', app.get('port'));
})
