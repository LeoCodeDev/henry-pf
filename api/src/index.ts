import express, {Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
const { sequelize } = require('./db_connection') 
const router = require('./routes/routerGetProduct')

dotenv.config();

const app: Express = express()
const port = process.env.PORT || 8000;

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// typescript para ignorar parámetros no usados debes agregarle
// un guion bajo delante de la palabra. ejem => _req 
// (esto lo hacemos para cuando no vamos a usar el parámetro en ese código)
app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server Grupo Health Tech')
})

app.use('/', router);



sequelize.sync({force: true}).then(() => {
  app.listen(port, () => {
      console.log(`⚡ﻌ[server]: Server is running at https://localhost:${port}`)
  })
})
