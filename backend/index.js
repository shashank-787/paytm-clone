const express = require('express')
const mainRouter = require('./routes/index')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/api/v1', mainRouter)

app.get('/', (req, res) =>{
    res.send("home");
})

app.listen(3000, () =>{
    console.log('the server is listening');
})