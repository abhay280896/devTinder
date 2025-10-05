const express = require('express')
const app = express()
const port = 5000

app.use('/',(req,res)=>{
  console.log('first')
  res.send(`connected to path '/'`)
})

app.listen(port,()=> console.log(`Server running on http://localhost:${port}`))
