express = require 'express'

router = express.Router()

# GET home page.

router.get '/', (req, res) ->
  res.render 'index', { grid_index: 1 } #the grid_index is to create the 5 grids of flight data

module.exports = router
