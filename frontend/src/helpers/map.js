import { fromJS } from 'immutable';

import darkStyle from '../mapboxStyle.json';

export const defaultMapStyle = fromJS(darkStyle);

export function addMapSourceAndStyle(newSourceId, newSource, style, currentMapStyle) {
  // if (newSourceId === 'composite') {
  //   const mapStyle = currentMapStyle
  //     .set('layers', currentMapStyle.get('layers').insert(5, fromJS(style)));
  //   return mapStyle;
  // }
  const mapStyle = currentMapStyle
  // Add source to map
    .setIn(['sources', newSourceId], fromJS({ ...newSource }))
  // Add point layer to map
    .set('layers', currentMapStyle.get('layers').insert(2, fromJS(style)));

  return mapStyle;
}

function setStyle(defaults, layer) {
  if (layer.mapbox.style) {
    return Object.assign({}, defaults.style, layer.mapbox.style);
  }
  return Object.assign({}, defaults.style);
}

function setSource(defaults, layer) {
  if (layer.mapbox.dataUrl) {
    return Object.assign({}, defaults.source, { data: layer.mapbox.dataUrl });
  }
  return Object.assign({}, defaults.source, layer.mapbox.source);
}

export function setPayloadFromData(defaults, selectedLayer, mapStyle = defaultMapStyle) {
  const source = setSource(defaults, selectedLayer);
  const style = setStyle(defaults, selectedLayer);
  style.id = selectedLayer.mapbox.id;
  style.source = selectedLayer.mapbox.id;
  //style['source-layer'] = selectedLayer.mapbox.id;

  const newMapStyle = addMapSourceAndStyle(selectedLayer.mapbox.id, source, style, mapStyle);

  return newMapStyle;
}

export function removeAddedLayer(mapStyle) {
  const defaultSource = defaultMapStyle.get('sources');
  const defaultLayers = defaultMapStyle.get('layers');

  return mapStyle
    // set default source and layers to map
    .set('sources', defaultSource)
    .set('layers', defaultLayers);
}

// remove current layer from the current map style when changing layers
export function replaceCurrentLayers(currentMapStyle, layerID) {
  const currentSources = currentMapStyle.get('sources').toJSON();
  const currentLayers = currentMapStyle.get('layers').toJSON();

  // remove property from sources
  delete currentSources[layerID];

  // find index of current added layer and remove it
  const layer = currentLayers.find(l => l.id === layerID);
  const layerIdx = currentLayers.indexOf(layer);
  if (layerIdx > -1) {
    currentLayers.splice(layerIdx, 1);
  }

  const style = currentMapStyle
    .set('sources', fromJS(currentSources))
    .set('layers', fromJS(currentLayers));

  return style;
}

// remove current layer from the current map style when changing layers
export function removeCurrentLayers(currentMapStyle, layerID) {
  return replaceCurrentLayers(currentMapStyle, layerID)
}
