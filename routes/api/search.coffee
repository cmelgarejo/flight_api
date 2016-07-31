express = require 'express'
request = require 'request'

router = express.Router()

### Gets the list of airports ###
router.post '/:airline', (req, res) ->
  request.get "http://node.locomote.com/code-task/flight_search/#{req.params.airline}?date=#{req.body.date}&from=#{req.body.from}&to=#{req.body.to}", (err, rsp, body) ->
    body = [] if err or rsp.statusCode isnt 200
    res.send body

module.exports = router
