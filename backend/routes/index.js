const express = require('express')
const userRouter = require('./user')
const accountRouter = require('./account')
const mainRouter = express.Router()
const {authMiddleware} = require('../middleware')

mainRouter.use('/user', userRouter);
mainRouter.use('/account', accountRouter);
mainRouter.get('/', (req, res) =>{
    res.send('main route')
})
mainRouter.get('/me', authMiddleware, (req, res)=> {
    res.json({
        userId : req.userId
    })
})


module.exports = mainRouter