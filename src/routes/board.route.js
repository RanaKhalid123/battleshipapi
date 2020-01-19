const express = require('express')
const boardCtrl = require('../controllers/board.controller')

const router = express.Router()

router.route('/')
  /** GET /api/boards - Get list of boards */
  .get(boardCtrl.list)

  /** POST /api/boards - Create new board */
  .post(boardCtrl.create)

router.route('/:boardId')
  /** GET /api/boards/:boardId - Get board */
  .get(boardCtrl.get)

  /** DELETE /api/boards/:boardId - Delete board */
  .delete(boardCtrl.remove)

router.route('/:boardId/_add_unit')
  /** POST /api/boards - Defender add ship to the game */
  .post(boardCtrl.addUnit)

router.route('/:boardId/_fire')
  /** POST /api/boards - Attacker fire the secret ship */
  .post(boardCtrl.fire)

/** Load board when API with boardId route parameter is hit */
router.param('boardId', boardCtrl.load)

module.exports = router
