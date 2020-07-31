import React from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import { connect } from 'react-redux';
import {
  Button,
  Tooltip,
  notification,
  Icon,
} from 'antd';

import config from '../configuration/config';

// components
import LayersOptions from './LayersOptions';
import ControlPanel from './ControlPanel';
import ReactGeocoder from './ReactGeocoder';
import MapLegend from './MapLegend';


class _MapLayerLayersOptions extends React.Component {
  /*
  Bundle LayersOptions with a button that opens LayerOptions
  when LayerOptions is closed.
  */

  setVisible = (value) => {
    this.props.setControlsHidden(!value);
  };

  render() {
    return (<div>
      <LayersOptions
        show={this.setVisible}
      />
      <Tooltip title="Show Controls">
        <Button
          className="show-layers-button"
          icon="bars"
          type="circle"
          onClick={() => {
            this.props.setControlsHidden(false);
          }}
        />
      </Tooltip>
    </div>);
  }

}

const controlsDispatch = dispatch => ({
  setControlsHidden: hidden => dispatch.controls.setHidden(hidden),
});
const MapLayerLayersOptions = connect(null, controlsDispatch)(_MapLayerLayersOptions);


class MapLayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSlider: false,
    };
  }

  componentWillReceiveProps(props) {
    const { selectedLayer } = props;
    if (!selectedLayer) {
      this.setState({ showSlider: false });
    } else {
      this.setState({ showSlider: true });
    }
  }

  showNotification = (title, text) => {
    this.setState({ showSlider: false });
    notification.open({
      message: title,
      description: text,
      icon: <Icon type="frown" style={{ color: '#8B0000' }} />,
    });
  };

  triggerRerender = () => {
    this.setState(this.state);
  }

  render() {
    const {
      viewportData,
      setNewViewport,
      mapStyle,
      minZoom,
      maxZoom,
      hideControls,
    } = this.props;

    const {
      showSlider,
    } = this.state;

    return (
      <div>
        <ReactGeocoder 
          mapRef={this.mapRef}
          triggerRerender={this.triggerRerender}
        />
        <div>
          <ReactMapGL
            mapboxApiAccessToken={config.mapboxToken}
            {...viewportData}
            reuseMaps
            mapStyle={mapStyle}
            onViewportChange={viewport => setNewViewport(viewport)}
            ref={ map => this.mapRef = map }
            dragRotate={false}
            touchRotate={false}
            maxZoom={maxZoom}
            minZoom={minZoom}
            fitBounds={[-5.238938, -12.451308, 46.558656, 51.184074]}
          >
            <div style={{position: 'absolute', right: 10, top: 70}}>
              {!hideControls && <NavigationControl 
                onViewportChange={viewport => setNewViewport(viewport)} 
                showCompass={false}
              />}
            </div>
          </ReactMapGL>
          {
            showSlider &&
            <ControlPanel />
          }
          <MapLegend/>
        </div>
        <MapLayerLayersOptions/>
      </div>
    );
  }
}

const mapState = state => ({
  mapStyle: state.map.mapStyle,
  data: state.map.data,
  mapType: state.map.mapType,
  selectedLayer: state.map.selectedLayer,
  selectedSubcategory: state.map.selectedSubcategory,
  minZoom: state.map.minZoom,
  maxZoom: state.map.maxZoom,
  boundaryValue: state.map.boundaryValue,
  viewportData: state.map.viewportData,
  hideControls: state.controls.hidden,
});

const mapDispatch = dispatch => ({
  setNewViewport: data => dispatch.map.setNewViewport(data),
});

export default connect(mapState, mapDispatch)(MapLayer);
