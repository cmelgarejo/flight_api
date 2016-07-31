express = require 'express'
request = require 'request'
router = express.Router()

### Gets the list of airports ###
router.get '/', (req, res) ->
  searchTerm = req.query.q or req.query.term
  request.get "http://node.locomote.com/code-task/airports?q=#{searchTerm}", (err, rsp, body) ->
    result = [] if err or rsp.statusCode isnt 200
    if req.query.term isnt undefined #When it's called by the jquery autocomplete
      result = for airport in JSON.parse(body)
        { id: "#{airport.airportName}, #{airport.cityName}, #{airport.countryName}", label: "#{airport.airportName}, #{airport.cityName}, #{airport.countryName}", value: airport }
    else #if it's called by a common query param "?q="
      result = body
    res.send result

module.exports = router
