import express, {Express} from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser'
const routes = require('./routes/index')
const { sequelize } = require('./db_connection') 



dotenv.config();

const app: Express = express()
const port = process.env.PORT || 8000;

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/', routes)

// typescript para ignorar parámetros no usados debes agregarle
// un guion bajo delante de la palabra. ejem => _req 
// (esto lo hacemos para cuando no vamos a usar el parámetro en ese código)



sequelize.sync({alter:true}).then(() => {
  app.listen(port, () => {
      console.log(`⚡ﻌ[server]: Server is running at https://localhost:${port}`)
  })
})


