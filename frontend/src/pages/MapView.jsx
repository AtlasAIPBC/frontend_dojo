import React from 'react';
import { Row, Col } from 'antd';
import MapContainer from '../components/MapContainer';
import { connect } from 'react-redux';

class MapView extends React.Component {

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    const { viewportData } = this.props;
    this.props.setNewViewport({
        ...viewportData,
        width: window.innerWidth,
        height: window.innerHeight,
    })
  };

  render() {
    return (
      <div>
        <Row type="flex" justify="center" align="middle" style={{ height: '100vh' }}>
          <Col>
            <MapContainer />
          </Col>
        </Row>
      </div>
    );
  }
}


const mapState = state => ({
  viewportData: state.map.viewportData,
});

const mapDispatch = dispatch => ({
  setNewViewport: data => dispatch.map.setNewViewport(data),
});

export default connect(mapState, mapDispatch)(MapView);;
