import express, {Express} from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
const cookieParser = require('cookie-parser')
const routes = require('./routes/index')
const { sequelize } = require('./db_connection') 
// const {ip} = require('express-ip');


dotenv.config();

const app: Express = express()
const port = process.env.PORT || 8000;
const origin = process.env.ORIGIN || 'http://localhost:5173';

app.use(morgan('dev'))
// app.use(cors())
app.use(cors({ credentials: true, origin: origin }));
app.use(cookieParser())
// app.use((_req, res, next)=>{
//res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT');
//   res.header('Access-Control-Max-Age', '86400');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   if (_req.method === 'OPTIONS') {
//     res.sendStatus(204); // Respond to preflight requests
//   } else {
//     next();
//   }
// })
app.use(express.json())
// app.use('/products', middleware, next)
app.use('/', routes)

// typescript para ignorar parámetros no usados debes agregarle
// un guion bajo delante de la palabra. ejem => _req 
// (esto lo hacemos para cuando no vamos a usar el parámetro en ese código)


const initServer = () => {
  try {
    sequelize.sync({alter:true}).then(() => {
      app.listen(port, () => {
          console.log(`⚡ﻌ[server]: Server is running at https://localhost:${port}`)
      })
    })
  } catch (error) {
    console.log('Conection Failed! Retrying.....');
    setTimeout(initServer,3000)
  }
}

initServer()


