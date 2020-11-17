//gemmer express i variabel
const express = require('express')
//starter express-server på port 4000
const server = express()
const port = 2000

//server aktiveres
server.listen(port, () => {
  console.log(`Server-applikation lytter på http://localhost:${port}`)
})


