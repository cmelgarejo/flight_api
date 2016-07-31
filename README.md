# Flight API

Simple SPA and proxy API for the **mock** Flight API by the awesome guys @ [Locomote](https://www.locomote.com/)

## Requirements
* Node.js

### Optionally:
* grunt-cli

## Getting started

Just type:

```
./start.sh
```

And open the [FlightAPI](http://localhost:3000) site in your browser

### Alternatively

First install the npm dependencies the project needs:
```
npm install
```

Then you just can run it with:
```
npm start
```

Also, you can use **grunt-cli**. Install the command-line tool with:
```
npm install grunt-cli -g

```

Then run it in develop/watch mode with:
```
grunt
```

# Website USAGE

Just select (type) the "From" and "To" cities you want, select the date of departure, and click on the "Find Flights" button and you'll get the list of flights, ordered by the lowest prices, for each Airline ;)

# TODO

* Use and object and eventEmitter to check the completeness of the creations of the grid rows, to disable the form meanwhile the data is getting loaded. Or to make an abort of all the processing and ajax calls too, we'll see about that later :D

* Map the From and To in an OpenLayers map with a flightpath animation, for fun :)
