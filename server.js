const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/', require('./router'))
const port = process.env.PORT
app.listen(port, () => console.log(`Server running on port ${port}`))