const mongoose = require('mongoose')
const httpStatus = require('http-status')
const APIError = require('../helpers/APIError')

/**
 * Ship Schema
 */
const ShipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  l: {
    type: Number,
    required: true
  }
})

/**
 * Statics
 */
ShipSchema.statics = {
  /**
   * Get ship
   * @param {ObjectId} id - The objectId of ship.
   * @returns {Promise<Ship, APIError>}
   */
  async get (id) {
    const ship = await this.findById(id).exec()
    if (ship) {
      return ship
    }
    const err = new APIError('No such a ship exists!', httpStatus.NOT_FOUND)
    throw err
  }
}

/**
 * @typedef Ship
 */
module.exports = mongoose.model('Ship', ShipSchema)
