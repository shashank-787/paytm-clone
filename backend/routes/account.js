const express = require('express')
const mongoose = require('mongoose')
const { authMiddleware } = require('../middleware')
const { User, Account } = require('../db')
const router = express.Router()

router.use(authMiddleware)

router.get('/balance', async (req, res) => {
    const account = await Account.findOne({ userId: req.userId })
    res.json({ balance: account.balance })
})


router.post('/transfer', async (req, res) => {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const { to, amount } = req.body;

        const account = await Account.findOne({userId: req.userId}).session(session)
        
        if (!account || account.balance < amount) {
            await session.abortTransaction()
            return res.send('insufficient balance')
        }     

        const toAccount = await Account.findOne({userId: to}).session(session)

        if (!toAccount) {
            await session.abortTransaction()
            return res.send('invalid account')
        }
        
        //decrese balance from sender
        await Account.updateOne({ userId: req.userId }, {$inc: {balance: -amount}}).session(session)
        //imcrease balance from receiver
        await Account.updateOne({ userId: to }, {$inc: {balance: amount }}).session(session)

        await session.commitTransaction();
        res.send("transfer successfull")

    } catch (err) {
        await session.abortTransaction()
        res.send('transfer failed')
    } finally {
        session.endSession()
    }

})
// router.post('/transfer', authMiddleware, async (req, res) => {
//     //ugly way
//     const {to, amount} = req.body;

//     const fromAccount = await Account.findOne({ 
//         userId : req.userId 
//     })
//     if(fromAccount.balance < amount){
//         return res.send('insufficient balance')
//     }
//     const toAccount = await Account.findOne({ 
//         userId : to 
//     })
//     if(!toAccount){
//         return res.send('invalid account')
//     }
//     //decrese balance from sender
//     await Account.updateOne({userId : req.userId}, {$inc : {balance : -amount}})

//     //imcrease balance from receiver
//     await Account.updateOne({userId : to}, {$inc : {balance : amount}})

//     res.send("transfer successfull")

// })
module.exports = router 