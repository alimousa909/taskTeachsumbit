import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { iniatapp } from './src/utiels/iniat.js'
import path from 'path'
import { connect } from 'http2'
import {connectDB} from './DataBase/connection.js'
const app =express()
iniatapp (app,express)
const port = process.env.port || 8000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
 