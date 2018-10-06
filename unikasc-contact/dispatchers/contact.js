const Promise         = require('bluebird')
const knex            = require('./knex')
const uuid            = require('uuid/v1')

// Response
const { 
  errorResponse,
  successResponseWithData,
  successResponseWithoutData
} = require('../response')

const uuidValidator = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)

exports.createContact = (body) => {

  const currentTime = new Date().toISOString()

  const postContact = (body) => {
    return knex('contact')
      .insert({
        id: uuid(),
        user_id: body.user_id,
        name: body.name,
        address: body.address,
        gender: body.gender,
        status: false,
        create_at: currentTime,
        modify_at: currentTime
      })
  }

  const verify = (body) => {
    return new Promise((resolve, reject) => {
      body.user_id && body.name &&
      body.address && body.gender
      ?
        resolve(body)
      :
        reject(errorResponse("Some field is null", 409))
    })
  }

  return(
    verify(body)
      .then(result => postContact(result))
      .then(result => successResponseWithData(result.rowCount, "Successfully add contact", "POST", 201))
      .catch(error => error)
  )

}

exports.getContacts = (uuid) => {

  const getContacts = (uuid) => {
    return knex('contact')
      .where('user_id', uuid)
      .then(result => result)
      .catch(() => errorResponse("Internal server error", 500))
  }

  const getContactsAndCheckResult = (data) => {
    return new Promise((resolve, reject) => {
      data.length
      ?
        resolve(data)
      :
        reject(errorResponse("Empty table or there is no contacts founded", 404))
    })
  }

  const verify = (uuid) => {
    return new Promise((resolve, reject) => {
      uuid.length == 36 && uuidValidator.test(uuid)
      ?
        resolve(uuid)
      :
        reject(errorResponse("Invalid uuid sorry", 409))
    })
  }

  return(
    verify(uuid)
      .then(result => getContacts(result))
      .then(result => getContactsAndCheckResult(result))
      .then(result => successResponseWithData(result, "Successfully get all contacts", "GET", 200))
      .catch(error => error)
  )

}

exports.getSingleContact = (uuid) => {

  const getContact = (uuid) => {
    return knex('contact')
      .where('id', uuid)
      .then(result => result)
      .catch(() => errorResponse("Internal server error", 500))
  }

  const getContactAndCheckResult = (data) => {
    return new Promise((resolve, reject) => {
      data.length
      ?
        resolve(data)
      :
        reject(errorResponse("Empty table or there is no contact founded", 404))
    })
  }

  const verify = (uuid) => {
    return new Promise((resolve, reject) => {
      uuid.length == 36 && uuidValidator.test(uuid)
      ?
        resolve(uuid)
      :
        reject(errorResponse("Invalid uuid sorry", 409))
    })
  }

  return(
    verify(uuid)
      .then(result => getContact(result))
      .then(result => getContactAndCheckResult(result))
      .then(result => successResponseWithData(result, "Successfully single contact", "GET", 200))
      .catch(error => error)
  )

}

exports.updateContact = (uuid, body) => {

  const currentTime = new Date().toISOString()

  const updateContact = (uuid, body) => {
    console.log(uuid)
    return knex('contact')
      .where('id', uuid)
      .update({
        ...body,
        modify_at: currentTime
      })
  }
  
  const findContact = (uuid) => {
    return knex('contact')
      .where('id', uuid)
      .then(result => result)
  }

  const findContactAndCheckResult = (data) => {
    return new Promise((resolve, reject) => {
      data.length
      ?
        resolve(data)
      :
        reject(errorResponse("Contact not found", 404))
    })
  }

  const verify = (uuid) => {
    return new Promise((resolve, reject) => {
      uuid.length == 36 && uuidValidator.test(uuid)
      ?
        resolve(uuid)
      :
        reject(errorResponse("Invalid uuid sorry", 409))
    })
  }

  return(
    verify(uuid)
      .then(result => findContact(result))
      .then(result => findContactAndCheckResult(result))
      .then(result => updateContact(result[0].id, body))
      .then(result => successResponseWithData(result, "Update contact success", "DELETE", 201))
      .catch(error => error)
  )

}

exports.deleteContact = (uuid) => {

  const deleteContact = (uuid) => {
    console.log(uuid)
    return knex('contact')
      .where('id', uuid)
      .del()
  }
  
  const findContact = (uuid) => {
    return knex('contact')
      .where('id', uuid)
      .then(result => result)
  }

  const findContactAndCheckResult = (data) => {
    return new Promise((resolve, reject) => {
      data.length
      ?
        resolve(data)
      :
        reject(errorResponse("contact not found", 404))
    })
  }

  const verify = (uuid) => {
    return new Promise((resolve, reject) => {
      uuid.length == 36 && uuidValidator.test(uuid)
      ?
        resolve(uuid)
      :
        reject(errorResponse("Invalid uuid sorry", 409))
    })
  }

  return(
    verify(uuid)
      .then(result => findContact(result))
      .then(result => findContactAndCheckResult(result))
      .then(result => deleteContact(result[0].id))
      .then(result => successResponseWithData(result, "Delete contact success", "DELETE", 200))
      .catch(error => error)
  )

}