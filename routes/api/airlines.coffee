express = require 'express'
request = require 'request'
router = express.Router()

### Gets the list of airlines ###
router.get '/', (req, res) ->
  request.get 'http://node.locomote.com/code-task/airlines', (err, rsp, body) ->
    body = [] if err or rsp.statusCode isnt 200 #If there's an error in the call, return an empty array
    res.send body


module.exports = router
