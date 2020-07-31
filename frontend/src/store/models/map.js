import {
  defaultMapStyle,
  setPayloadFromData,
  removeCurrentLayers,
} from '../../helpers/map';

import { getAllLayers, getBoundaries } from '../../api';

import { FlyToInterpolator} from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';

const defaultBoundaryValue = 2;
const defaultPeriodValue = 1;

function updateViewport(layer, viewportData) {
    if (viewportData["zoom"] > layer.maxZoom || 
        viewportData["zoom"] < layer.minZoom || 
        viewportData["latitude"] < layer.bounds[0] ||
        viewportData["longitude"] > layer.bounds[2] ||
        viewportData["latitude"] < layer.bounds[1] ||
        viewportData["longitude"] > layer.bounds[4]) {

      const {longitude, latitude, zoom} = new WebMercatorViewport(viewportData)
            .fitBounds([[layer.bounds[0],layer.bounds[1]], [layer.bounds[2],layer.bounds[3]]], {
              padding: 10,
              offset: [0, -100]
            });

      viewportData['longitude'] = longitude
      viewportData['latitude'] = latitude
      viewportData['zoom'] = zoom
      viewportData['transitionDuration'] = 1300;
      viewportData['transitionInterpolator'] = new FlyToInterpolator();
    }

    return viewportData;
}

function computeNewState(state) {
    const {
        categories,
        boundaries,
        selectedCategoryName,
        selectedSubcategoryName,
        periodValue,
        boundaryValue,
     } = state;
        
    const category = categories.find(cat => cat.name === selectedCategoryName);
    if (!(category && category.subcategories)) {
        return null;
    }

    const subcategory = category.subcategories.find(subcat => subcat.name === selectedSubcategoryName);
    if (!(subcategory && subcategory.data)) {
        return null;
    }

    const subcategoryPeriods = subcategory.data.periods;
    if (!subcategoryPeriods) {
        return null;
    }

    const layers = subcategory.data.layers;
    if (!(layers && layers.length)) {
        return null;
    }

    const layer = layers.find(layer => layer.period === periodValue && layer.boundary === boundaryValue)
    if (!layer) {
        return null;
    }

    const periodObj = subcategoryPeriods.find(period => period.id === periodValue);
    if (!periodObj) {
        return null;
    }

    const periodText = periodObj.name;
    if (!periodText) {
        return null;
    }

    const boundaryObj = boundaries.find(boundary => boundary.id === boundaryValue);
    if (!boundaryObj) {
        return null;
    }

    const boundaryText = boundaryObj.name;
    if (!boundaryText) {
        return null;
    }

    const subcatDataDefaults = subcategory.data.defaults;
    if (!subcatDataDefaults) {
        return null;
    }
    const currentMapboxId = (
        state.selectedLayer && state.selectedLayer.mapbox
        && state.selectedLayer.mapbox.id
    );
    const baseMapStyle = currentMapboxId ? 
        removeCurrentLayers(state.mapStyle, state.selectedLayer.mapbox.id) :
        state.mapStyle;
    const mapStyle = setPayloadFromData(
        subcatDataDefaults,
        layer,
        baseMapStyle,
    );

    const viewportData = updateViewport(layer, state.viewportData);

    return {
        ...state,
        viewportData: viewportData,
        selectedLayer: layer,
        selectedCategory: category,
        selectedSubcategory: subcategory,
        subcategoryPeriods: subcategoryPeriods,
        periodText: periodText,
        boundaryText: boundaryText,
        mapStyle: mapStyle,
    }
}

function updateReadOnlyState(state, newState) {
    newState = computeNewState(newState);
    if (newState) {
        return {
            ...newState,
            errorOnLastInput: false,
        };
    }
    return {
        ...state,
        errorOnLastInput: true,
    };
}

export default {
  state: {
    mapType: 'map',
    maxZoom: 14,
    minZoom: 0,
    viewportData: {
        width: 800,
        height: 500,
        longitude: 25.0386,
        latitude: 8.1533,
        zoom: 2.4,
    },

    categories: [],
    boundaries: [],  // This should eventually be moved to within the subcategory at which point it will be read only.
    periodValue: 1,  // The id property of the selected period.
    boundaryValue: defaultBoundaryValue,  // The id property of the selected boundary.
    selectedSubcategoryName: "Wealth",
    selectedCategoryName: "Economic Indicators",

    // Read-only, computed when the above are set.
    selectedLayer: {},
    selectedCategory: {},
    selectedSubcategory: {},
    subcategoryPeriods: [],
    periodText: '',
    boundaryText: '',
    errorOnLastInput: false,
    mapStyle: defaultMapStyle,
  },
  reducers: {
    setNoError(state) {
        return {
            ...state,
            errorOnLastInput: false,
        }
    },
    setNewViewport(state, payload) {
        return {
            ...state,
            viewportData: payload,
        }
    },
    setCategoriesBoundaries(state, payload) {
        const categories = payload.categories

        const defaultCategory = categories[0];
        const defaultCategoryName = defaultCategory.name;

        const defaultSubcategory = defaultCategory.subcategories && defaultCategory.subcategories.length
            ? defaultCategory.subcategories[0] : {};
        const defaultSubcategoryName = defaultSubcategory.name ? defaultSubcategory.name : null;
        const subcatData = defaultSubcategory.data;

        const defaultLayer = subcatData && subcatData.layers && subcatData.layers.length
            ? subcatData.layers[0] : {};
        const defaultPeriod = defaultLayer.period ? defaultLayer.period : defaultPeriodValue;

        const newState = {
            ...state,
            categories: categories,
            boundaries: payload.boundaries.layers,
            boundariesMeta: payload.boundaries.meta,
            selectedCategoryName: defaultCategoryName,
            selectedSubcategoryName: defaultSubcategoryName,
            periodValue: defaultPeriod,
            boundaryValue: defaultBoundaryValue,
        };

        return updateReadOnlyState(state, newState);
    },
    selectSelectedSubcategory(state, categoryName, subcategoryName) {
        const categories = state.categories;
        
        var periodValue = defaultPeriodValue;
        const category = categories.find(cat => cat.name === categoryName);
        if (category && category.subcategories) {
            const subcategory = category.subcategories.find(subcat => subcat.name == subcategoryName);
            if (subcategory && subcategory.data) {
                periodValue = subcategory.data.layers && subcategory.data.layers.length ?
                    subcategory.data.layers[0].period : defaultPeriodValue;
            }
        }
        if (!periodValue) {
            periodValue = defaultPeriodValue;
        }

        const newState = {
            ...state,
            selectedCategoryName: categoryName,
            selectedSubcategoryName: subcategoryName,
            periodValue: periodValue,
        };

        return updateReadOnlyState(state, newState);
    },
    selectLayerPeriod(state, periodId) {
        const newState = {
            ...state,
            periodValue: periodId,
        };

        return updateReadOnlyState(state, newState);
    },
    selectLayerBoundaries(state, boundaryId) {
        const newState = {
            ...state,
            boundaryValue: boundaryId,
        };

        return updateReadOnlyState(state, newState);
    },
  },
  effects: dispatch => ({

    async initialize(firebaseIdToken) {

        const layersResponse = await getAllLayers(firebaseIdToken);
        if (layersResponse === Error) {
            return layersResponse;
        }
        const categories = layersResponse.data.categories;

        const boundariesResponse = await getBoundaries(firebaseIdToken);
        if (boundariesResponse === Error) {
            return boundariesResponse;
        }
        const boundaries = boundariesResponse.data;

        dispatch.map.setCategoriesBoundaries({
            categories: categories,
            boundaries: boundaries,
        })
    },

  }),
};
