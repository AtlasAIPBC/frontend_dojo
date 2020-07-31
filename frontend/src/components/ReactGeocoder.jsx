import React from 'react';
import { connect } from 'react-redux';
import config from '../configuration/config';
import Geocoder from './StandAloneGeocoder';
import geoViewport from '@mapbox/geo-viewport';

import { FlyToInterpolator} from 'react-map-gl';

class ReactGeocoder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(value) {
        this.setState({ value: value });
    }

    onSelect(value, setNewViewport, viewportData, mapRef) {
        this.setState({ value: value });

        if (value['place_type'][0] === "address" || value['place_type'][0] === "poi"){
            viewportData['latitude'] = value['center'][1];
            viewportData['longitude'] = value['center'][0];
            viewportData['zoom'] = 13;
        }
        else {
            const viewport = geoViewport.viewport(value['bbox'], [640, 480]);

            viewportData['latitude'] = viewport['center'][1];
            viewportData['longitude'] = viewport['center'][0];
            viewportData['zoom'] = viewport['zoom'];
        }
        viewportData['transitionDuration'] = 1300;
        viewportData['transitionInterpolator'] = new FlyToInterpolator();
        setNewViewport(viewportData);
        this.props.triggerRerender()
    }

    render() {
        const { setNewViewport, viewportData, mapRef, hideControls } = this.props;
        
        if (hideControls) {
            return null;
        }

        return (
          <div>
            <div className="clearfix pad1">
              <Geocoder
                accessToken={config.mapboxToken}
                onSelect={value => this.onSelect(value, setNewViewport, viewportData, mapRef) }
                showLoader={false}
              />
            </div>
          </div>
        );
    }
}


const mapState = state => ({
    viewportData: state.map.viewportData,
    hideControls: state.controls.hidden,
  });
  
  const mapDispatch = dispatch => ({
    setNewViewport: data => dispatch.map.setNewViewport(data),
  });

export default connect(mapState, mapDispatch)(ReactGeocoder);
