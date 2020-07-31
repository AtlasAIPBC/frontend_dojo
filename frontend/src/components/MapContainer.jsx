import React from 'react';
import { notification, Icon } from 'antd';
import { connect } from 'react-redux';

import MapLayer from './MapLayer';

class MapContainer extends React.Component {

  componentDidMount() {
    this.props.initialize(this.props.firebaseIdToken)
      .catch((error) => {
        this.showNotification('API Error', 'There is an issue with the API.');
      });
  }

  componentDidUpdate() {
    if (this.props.errorOnLastInput) {
      this.showNotification('Layer Data', 'Layer data not available.');
      this.props.setNoError();
    }
  }

  showNotification = (title, text) => notification.open({
    message: title,
    description: text,
    icon: <Icon type="frown" style={{ color: '#8B0000' }} />,
  });

  render() {
    return (
      <div>
        <MapLayer />
      </div>
    );
  }
}

const mapState = state => ({
  firebaseIdToken: state.auth.idToken,
  errorOnLastInput: state.map.errorOnLastInput,
});

const mapDispatch = dispatch => ({
  initialize: firebaseIdToken => dispatch.map.initialize(firebaseIdToken),
  setNoError: () => dispatch.map.setNoError(),
});

export default connect(mapState, mapDispatch)(MapContainer);
