import axios from 'axios';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getAllLayers(firebaseIdToken) {
  // const url = 'api/layers';
  // const requestOptions = {}

  // return axios.get(url, requestOptions);
  var layers =  require('./layers.json');
  await sleep(200); // simulate API call
  return {data: layers};
}

export async function getBoundaries(firebaseIdToken) {
  // const url = 'api/boundaries';
  // const requestOptions = {}
  // return axios.get(url, requestOptions);

  var boundaries = require('./boundaries.json');
  await sleep(200); // simulate API call
  return {data: boundaries};
}

// export async function getLayerData(layerDataUrl) {
//   const response = await axios.get(layerDataUrl);
//   if (response === Error) {
//     return [];
//   }
//   return response.data;
// }
