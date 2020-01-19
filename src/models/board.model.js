const mongoose = require('mongoose')
const httpStatus = require('http-status')
const Schema = mongoose.Schema
const APIError = require('../helpers/APIError')

/**
 * Board Schema
 */
const BoardSchema = new mongoose.Schema({
  // size of square grid
  square_grid: {
    type: Number,
    required: true
  },
  /*
   * number of ship destroyed
   */
  ship_destroyed: {
    type: Number,
    default: 0
  },
  /*
   * state of board as a number
   * 0 is initial (no ships)
   * 1 is inprogress (defender put their ships but not complate)
   * 2 is ready (defender places thier ship complately)
   * 3 is finished
   */
  state: {
    type: Number,
    default: 0
  },
  /*
   * cell that fired
   */
  fired: [{
    type: String
  }],
  /*
   * Array of secret ship in this board
   */
  ships: [{
    /*
     * type of ship
     */
    type: {
      type: Number
    },
    /*
     * Name of ship
     */
    name: {
      type: String
    },
    /*
     * length of ship
     */
    l: {
      type: Number
    },
    /*
     * status of the ship
     */
    destroyed: {
      type: Boolean,
      default: false
    },
    /*
     * corrodinates of the ship
     */
    cors: Schema.Types.Mixed
  }]
})

/**
 * Methods
 */
BoardSchema.method({
})

/**
 * Statics
 */
BoardSchema.statics = {
  /**
   * List boards in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of boards to be skipped.
   * @param {number} limit - Limit number of boards to be returned.
   * @returns {Promise<Board[]>}
   */
  list ({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({
        createdAt: -1
      })
      .skip(+skip)
      .limit(+limit)
      .exec()
  },

  /**
   * Get board
   * @param {ObjectId} id - The objectId of board.
   * @returns {Promise<Board, APIError>}
   */
  async get (id) {
    const board = await this.findById(id).exec()
    if (board) {
      return board
    }
    const err = new APIError('No such a board exists!', httpStatus.NOT_FOUND)
    throw err
  }
}

/**
 * @typedef Board
 */
module.exports = mongoose.model('Board', BoardSchema)
