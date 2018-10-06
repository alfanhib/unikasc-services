const Promise         = require('bluebird')
const knex            = require('./knex')
const bcrypt          = require('bcrypt')
const uuid            = require('uuid/v1')

// Response
const { 
  errorResponse,
  successResponseWithData,
  successResponseWithoutData
} = require('../response')

// Global Function
const encryptPassword = (password) => {
  return bcrypt
    .hash(password, 10)
    .then(hash => hash)
    .catch(() => errorResponse("Internal server error", 500))
}

const decryptPassword = (password, hashedPassword) => {
  return bcrypt
    .compare(password, hashedPassword)
    .then(result => {
      return new Promise((resolve, reject) => {
        result
        ?
          resolve(result)
        :
          reject(errorResponse("Incorrect Password", 409))
      })
    })
}

exports.registerUser = (body) => {

  // Get current time
  const currentTime = new Date().toISOString()

  // Store new user to database
  const registerUserAsync = (body, hashedPassword) => {
    return knex('users')
      .insert({
        id: uuid(),
        email_address: body.email_address,
        username: body.username,
        password: hashedPassword,
        status: false,
        create_at: currentTime,
        modify_at: currentTime
      })
  }
  
  // Check email availability
  const checkEmailAvailability = (item) => {
    return knex('users')
      .where('users.email_address', item.email_address)
      .then(result => result)
      .catch(() => errorResponse("Internal server error", 500))
  }

  // Check email availability result
  const checkEmailAvailabilityAsync = (data) =>{
    console.log("data",data)
    return new Promise((resolve, reject) => {
      data.length
      ?
        reject(errorResponse("Email already used", 409))
      :
        resolve(data)
    })
  }

  // Verify
  const verify = (item) => {
    return new Promise((resolve, reject) => {
      item.email_address && item.username  
      ?
        resolve(item)
      :
        reject(errorResponse("Some field is null", 409))
    })
  }

  // Processing
  return(
    verify(body)
      .then(result => checkEmailAvailability(result))
      .then(result => checkEmailAvailabilityAsync(result))
      .then(() => encryptPassword(body.password))
      .then(hashedPassword => registerUserAsync(body, hashedPassword))
      .then(result => successResponseWithData(result.rowCount, "New user has been registered", "POST", 201))
      .catch(error => error)
  )

}

exports.getUsers = () => {

  // Get all users
  const getUsers = () => {
    return knex('users')
      .then(result => result)
      .catch(() => errorResponse("Internal server error", 500))
  }

  // Check is users are exist
  const getUsersAndCheckResult = (data) => {
    return new Promise((resolve, reject) => {
      data.length
      ?
        resolve(data)
      :
        reject(errorResponse("Empty table or there is no users founded", 404))
    })
  }

  // Processing
  return(
    getUsers()
      .then(result => getUsersAndCheckResult(result))
      .then(result => successResponseWithData(result, "Successfully get all users", "GET", 200))
      .catch(error => error)
  )

}

exports.getUserWithUUID = (uuid) => {

  // Get all user
  const getUser = (uuid) => {
    return knex('users')
      .where('users.id', uuid)
      .then(result => result)
      .catch(() => errorResponse("Internal server error", 500))
  }

  // Check is user are exist
  const getUserAndCheckResult = (data) => {
    return new Promise((resolve, reject) => {
      data.length
      ?
        resolve(data)
      :
        reject(errorResponse(`No user found`, 404))
    })
  }

  // Processing
  return(
    getUser(uuid)
      .then(result => getUserAndCheckResult(result))
      .then(result => successResponseWithData(result, "Successfully get user", "GET", 200))
      .catch(error => error)
  )

}