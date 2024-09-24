// import axios from 'axios'

// import HttpError from '../models/http-error.js';

// const API_KEY = 'AIzaSyB5LOtatfqRCeGJaFcCSezqitWJTosP7Wg';

export const  getCoordesForAddress=async(address)=> {
  return {
    lat: 40.7484474,
    lng: -73.9871516
  };
//   const response = await axios.get(
//     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);

//   const data = response.data;
//   if (!data.results.length) {
//         throw new HttpError('Could not find address', 422);
//         }

//   if (!data || data.status === 'ZERO_RESULTS') {
//     const error = new HttpError(
//       'Could not find location for the specified address.',
//       422
//     );
//     throw error;
//   }

//   const coordinates = data.results[0].geometry.location;

//   return coordinates;
}

