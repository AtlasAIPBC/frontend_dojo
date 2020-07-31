export function setPeriodsRange(periods) {
  let minPeriod = 1;
  let periodsLength = 0;
  let maxPeriod = 1;
  if (periods.length) {
    minPeriod = periods ? periods[periodsLength].id : 1;
    periodsLength = periods.length;
    maxPeriod = periods[periodsLength - 1].id;
  }

  return {
    minPeriod,
    maxPeriod,
  };
}

export function changeLayerPeriod(options) {
  const {
    category,
    periods,
    value,
    boundary,
  } = options;
  const { layers } = category.data;

  const newLayer = layers.find(l => l.period === value && l.boundary === boundary)
    || layers.find(l => l.period === value);
  const mapData = { defaults: category.data.defaults, layer: newLayer };
  const layerData = { layer: newLayer, periods };

  return {
    mapData,
    layerData,
  };
}

export function setBoundariesRange(boundaries) {
  let minBound = 0;
  let boundLength = 0;
  let maxBound = 1;
  if (boundaries.length) {
    minBound = boundaries ? boundaries[boundLength].id : 1;
    boundLength = boundaries.length;
    maxBound = boundaries[boundLength - 1].id;
  }

  return {
    minBound,
    maxBound,
  };
}

export function changeLayerPerBoundary(options) {
  const {
    category,
    periods,
    value,
    periodValue,
  } = options;
  const { layers } = category.data;

  const newLayer =  layers.find(l => l.boundary === value && l.period === periodValue)
    || layers.find(l => l.boundary === value);
  const mapData = { defaults: category.data.defaults, layer: newLayer };
  const layerData = { layer: newLayer, periods };

  return {
    mapData,
    layerData,
  };
}
