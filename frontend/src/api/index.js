import axios from 'axios';

export function getAllLayers(firebaseIdToken) {
  const url = 'api/layers';
  const requestOptions = {}

  return axios.get(url, requestOptions);
}

export function getBoundaries(firebaseIdToken) {
  const url = 'api/boundaries';
  const requestOptions = {}
  return axios.get(url, requestOptions);
}

export async function getLayerData(layerDataUrl) {
  const response = await axios.get(layerDataUrl);
  if (response === Error) {
    return [];
  }
  return response.data;
}
