import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Card, Radio, Popover } from 'antd';


class ControlPanel extends PureComponent {

  updatePeriod = (value) => {
    var value_int = parseInt(value.target["value"], 10)
    this.props.selectLayerPeriod(value_int);
  };

  updateBoundary = (value) => {
    var value_int = parseInt(value.target["value"], 10)
    this.props.selectLayerBoundaries(value_int);
  };

  getBoundariesValues = (selectedSubcategory) => {

    var boundary_values = [];
    if ("data" in selectedSubcategory) {
      boundary_values = selectedSubcategory.data.layers.map((d) => d['boundary'])
    }

    return boundary_values
  };

  render() {
    const {
      layerPeriods,
      periodValue,
      boundaryValue,
      boundaries,
      boundariesMeta,
      selectedSubcategory,
      hideControls,
    } = this.props;

    if (hideControls) {
      return null;
    }

    var boundary_values = this.getBoundariesValues(selectedSubcategory);
    const disabledMessage = boundariesMeta && boundariesMeta.disabled && boundariesMeta.disabled.message;

    return (
      <div>
        <Card title={<div><center>Period</center></div>} bordered={false} className="control-panel-periods" size="small">
          <div style={{ marginTop: -12, display: 'flex', justifyContent: 'center'}}>
            <Radio.Group 
              value={periodValue.toString()} 
              buttonStyle="solid"
              onChange={this.updatePeriod}>
                {
                  layerPeriods.map((d) => 
                    d.disabled ?
                    <Popover content={d.disabled.message}><Radio.Button value={d["id"].toString()} disabled>{d["name"]}</Radio.Button></Popover> :
                    <Radio.Button value={d["id"].toString()}>{d["name"]}</Radio.Button>
                  )
                }
            </Radio.Group>
          </div>
        </Card>

        <Card title={<div><center>Level</center></div>} bordered={false} className="control-panel-boundaries" size="small">
          <div style={{ marginTop: -12, display: 'flex', justifyContent: 'center' }}>
            <Radio.Group
              value={boundaryValue.toString()}
              buttonStyle="solid"
              onChange={this.updateBoundary}>
                {
                  boundaries.map((d) => (
                    boundary_values.includes(d["id"])) ?
                    <Radio.Button value={d["id"].toString()} >{d["name"]}</Radio.Button> :
                    <Popover content={disabledMessage}><Radio.Button value={d["id"].toString()} disabled >{d["name"]}</Radio.Button></Popover>
                  )
                }
            </Radio.Group>
          </div>
        </Card>
      </div>
    )
  }
}

const mapState = state => ({
  boundaries: state.map.boundaries,
  boundariesMeta: state.map.boundariesMeta,
  boundaryValue: state.map.boundaryValue,
  layerPeriods: state.map.subcategoryPeriods,
  mapStyle: state.map.mapStyle,
  periodValue: state.map.periodValue,
  selectedLayer: state.map.selectedLayer,
  selectedSubcategory: state.map.selectedSubcategory,

  hideControls: state.controls.hidden,
});

const mapDispatch = dispatch => ({
  selectLayerPeriod: data => dispatch.map.selectLayerPeriod(data),
  selectLayerBoundaries: data => dispatch.map.selectLayerBoundaries(data),
});

export default connect(mapState, mapDispatch)(ControlPanel);
