// -- DESTINATIONS CONTROLLER
// -- Destination data from Amadeus API
const Amadeus = require('amadeus');
import e from 'express';
// import { client_id } from './playground';
// import { client_secret } from './playground';

const amadeus = new Amadeus({
  clientId: 'BpfL9bHF42njMFmGHB9aV63aawW9aCJZ',
  clientSecret: 'SgmPictEkG9D492W',
});

export function getDestinationCityList(req: any, res: any) {
  amadeus.client
    .get('/v1/airport/direct-destinations', {
      departureAirportCode: req.params.id,
      max: 300,
    })
    .then(function (response: any) {
      res.json(response.data);
      res.status(200);
    })
    .catch(function (error: any) {
      res.status(500);
      console.error(error);
    });
}

// -- Destination data from json file
// const destinationData = require('../assets/destinations.json');

// async function getDestinationCityList(req, res) {
//   try {
//     const listOfDestinationCities = [];
//     // -- Create an array or all destination city IATA codes
//     for (let element of destinationData) {
//       if (element.meta.origin === req.params.id) {
//         listOfDestinationCities.push(element.data)
//       }
//     }
//     // -- Response
//     res.json(listOfDestinationCities);
//     res.status(200);
//   } catch (err) {
//     res.status(500);
//     console.error(err);
//   }
// }

// module.exports = { getDestinationCityList };
