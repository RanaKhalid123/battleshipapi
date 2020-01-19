const express = require('express')
const boardRoutes = require('./board.route')

const router = express.Router()

/** GET /health-check - Check service health */
router.get('/ping', (req, res) => {
  res.send('pong')
})

// mount board routes at /boards
router.use('/boards', boardRoutes)

module.exports = router
