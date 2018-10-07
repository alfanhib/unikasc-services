const express = require('express')
const Promise = require('bluebird')
const router = express.Router()

// Contact Dispatchers
const { 
  createContact,
  getContacts,
  getSingleContact,
  updateContact,
  deleteContact
} = require('../../dispatchers/contact')

// Middlewares
const {
  authenticateUser
} = require('../../middlewares/authenticate')

// Post Contact
router.post('/user/contact/upload', authenticateUser, (req, res, next) => {
  Promise.try(() => createContact(req.body))
    .then(response => res.status(response.status).json(response))
    .catch(err => console.log("Error on POST_CONTACT", err))
})

// Get Contact
router.get('/contacts/:uuid', authenticateUser, (req, res, next) => {
  Promise.try(() => getContacts(req.params.uuid))
    .then(response => res.status(response.status).json(response))
    .catch(err => console.log("Error on GET_CONTACT", err))
})

// Get single Contact
router.get('/contact/:uuid', authenticateUser, (req, res, next) => {
  Promise.try(() => getSingleContact(req.params.uuid))
    .then(response => res.status(response.status).json(response))
    .catch(err => console.log("Error on GET_SINGLE_CONTACT", err))
})

// Update Contact
router.put('/user/contact/edit/:uuid', authenticateUser, (req, res, next) => {
  Promise.try(() => updateContact(req.params.uuid, req.body))
    .then(response => res.status(response.status).json(response))
    .catch(err => console.log("Error on UPDATE_CONTACT", err))
})

// Delete Contact
router.delete('/user/contact/delete/:uuid', authenticateUser, (req, res, next) => {
  Promise.try(() => deleteContact(req.params.uuid))
    .then(response => res.status(response.status).json(response))
    .catch(err => console.log("Error on DELETE_CONTACT", err))
})

module.exports = router