import axios from "axios";
// import HttpError from "../models/http-error.js";//important

const API_KEY = 'AIzaSyABwjR-XM72qbZ6SHzr4cd8Y3sZr2SZ5ME';
async function getCoordesForAddress(address){
   
    // return {
        // coordinates:{
        //     lat: 40.7128,
        //     lng: -74.0060

        // },
    //     address:address
    // }
       

        
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${API_KEY}`
      );
const  data=response.data;
console.log(data)
// if(!data||data.status==='ZERO_RESULTS'){
//     const error=new HttpError('Could not find the address location',422);
//     throw error;
// }   //important
const coordinates=data.results[0].geometry.location;
return (coordinates)?coordinates:{lat: 40.7128,lng: -74.0060}
}
export default getCoordesForAddress;