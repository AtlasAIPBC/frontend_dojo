import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';

class LandingModal extends React.Component {
  state = { visible: true }
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
        <Modal
          title={<div><center>Welcome to the Atlas AI Demo</center></div>}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="ok" type="primary" onClick={this.handleOk}>
              Ok
            </Button>,
          ]}
        >
          <div>
            <font size="3">
              <p>With this public version of the Atlas AI Platform,  you can browse a rich set of datasets that capture economic and agricultural outcomes across the African continent.</p>
              <p>Explore household asset wealth, growth in wealth over time, and maize yields — all at the pixel, district, and state levels. High resolution estimates are limited to specific regions of Kenya.</p>
              <p>The full product includes additional time periods, geographies, resolutions, and indicators. Want access? Contact <a href = "mailto: info@atlasai.co">info@atlasai.co</a>. </p>
            </font>
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(null, null)(LandingModal);