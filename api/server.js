// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')
const server = express()
server.use(express.json())


//get all users
server.get('/api/users', (req, res)=> {
    User.find()
        .then (users => {
            console.log(users)
            res.status(200).json(users)
        })
        .catch (err => {
            res.status(500).json({
                message: 'The users information could not be retrieved',
                error: err
            })
        })
})

//add a new user
server.post('/api/users', async (req, res) => {
    const {name, bio} = req.body;
    console.log('this is the request body', req.body)
    try {
        if (!name || !bio) {
            res.status(400).json({message: 'Please provide name and bio for the user'})
        }
        else {
            const newUser = await User.insert({name, bio})
            res.status(201).json({
                data: newUser
            })
        }
    }
    catch {
        res.status(500).json({message: 'There was an error while saving the user to the database'})
    }
})



module.exports = server; 
