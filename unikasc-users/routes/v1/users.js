const express = require('express')
const Promise = require('bluebird')
const router = express.Router()

// Users Dispatchers
const { 
  getUsers,
  getUserWithUUID,
  registerUser
} = require('../../dispatchers/users')

// Post or Register new user
router.post('/user/register', (req, res, next) => {
  Promise.try(() => registerUser(req.body))
    .then(response => res.status(response.status).json(response))
    .catch(err => console.log("Error on POST_USER", err))
})

// Get or Fetch all users
router.get('/users', (req, res, next) => {
  Promise.try(() => getUsers())
    .then(response => res.status(response.status).json(response))
    .catch(err => console.log("Error on GET_ALL_USERS", err))
})

// Get or Fetch single user
router.get('/user/:uuid', (req, res, next) => {
  Promise.try(() => getUserWithUUID(req.params.uuid))
    .then(response => res.status(response.status).json(response))
    .catch(err => console.log("Error on GET_SINGLE_USERS", err))
})

module.exports = router