import React, { Component } from 'react';
import { connect } from 'react-redux';

// styles
import 'antd/dist/antd.css';
import './styles/App.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

import MapView from './pages/MapView';
import LandingModal from './components/LandingModal'

import atlasLogoWhite from './assets/AtlasLogo_white.gif'


class App extends Component {

  render() {

    return (
      <div className="App">
        <LandingModal />
        <img
          alt='Atlas Logo'
          src={atlasLogoWhite}
          className="atlas-map-page-logo"
        />
        <MapView />
      </div>
    );
  }
}

const mapState = state => ({
  isUserLoggedIn: state.auth.isUserLoggedIn,
  loading: state.auth.loading,
  mapStyle: state.map.mapStyle,
  layerPeriods: state.map.layerPeriods,
  boundaries: state.map.boundaries,
});

const mapDispatch = dispatch => ({
  userLogOut: () => dispatch.auth.userLogOut(),
  refreshMapStyle: mapStyle => dispatch.map.refreshMapStyle(mapStyle),
  removeSelectedLayer: () => dispatch.map.removeSelectedLayer(),
  resetSliderValues: data => dispatch.map.resetSliderValues(data),
});

export default connect(mapState, mapDispatch)(App);
