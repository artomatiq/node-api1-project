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
            res.status(201).json(newUser)
        }
    }
    catch {
        res.status(500).json({message: 'There was an error while saving the user to the database'})
    }
})

//get specific user
server.get(`/api/users/:id`, (req, res) => {
    const {id} = req.params
    User.findById(id)
        .then (user => {
            if (!user) {
                res.status(404).json({message: "The user with the specified ID does not exist"})
            }
            else {
                res.json(user)
            }
        })
        .catch (err => {
            res.status(500).json({message: 'The user information could not be retrieved',})
        })
})

//delete user
server.delete(`/api/users/:id`, (req, res) => {
    const {id} = req.params
    User.remove(id)
        .then (user => {
            if (!user) {
                res.status(404).json({message: 'The user with the specified ID does not exist'})
            }
            else {
                res.json(user)
            }
        })
        .catch (err => {
            res.status(500).json({message: 'The user could not be removed'})
        })
})


module.exports = server; 
