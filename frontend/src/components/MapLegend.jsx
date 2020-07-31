import React from 'react';
import { connect } from 'react-redux';
import {
  Card
} from 'antd';

import { copyObj } from '../helpers/index';

class MapLegend extends React.Component {

  value_to_text = (value) => {
    const {selectedSubcategory} = this.props;
  
    if (selectedSubcategory.name === "Wealth") {
      return value + 1;
    }
  
    if (selectedSubcategory.name !== "Wealth Growth Rate") {
      if (value % 1 !== 0) {
        return value.toFixed(1);
      }
      return value;
    }
  
    if (value === -0.01) {
      return 'No Change';
    }
    if (value.toFixed(3) === "0.250") {
      return 'Increase';
    }
    return ''
  }

  render() {
    const {selectedSubcategory} = this.props;
  
    if (selectedSubcategory && selectedSubcategory.data && selectedSubcategory.data.defaults) {
      const colorsArray = copyObj(selectedSubcategory.data.defaults.style.paint['fill-color']);
      const legendDOM = [];
      let gradientColors = '';
  
      colorsArray.splice(0, 3);
  
      var step = Math.round(colorsArray.length/15) + 1;
      if (selectedSubcategory.name === "Wealth Growth Rate") {
        step -= 1;
      }
  
      for (let i=0; i < colorsArray.length-1 ; i += step*2) {
        legendDOM.push(
          <li>
            {this.value_to_text(colorsArray[i])}
          </li>
        )
      }
  
      for (let i=0; i < colorsArray.length-1 ; i += 2) {
        gradientColors += `${colorsArray[i+1]}`;
  
        if (colorsArray.length-2 !== i) {
          gradientColors += ', '
        }
      }
  
      var unitName = "Units"
      if (selectedSubcategory.name === "Wealth") {
        unitName = "Asset Wealth (Decile)"
      }
      else if (selectedSubcategory.name === "Wealth Growth Rate") {
        unitName = "Change in Asset Wealth"
      }
      else if (selectedSubcategory.name === "Maize Yield") {
        unitName = "Tons per Hectare"
      }
  
      const title = <div className="map-legend-title-wrapper">
        <div className="map-legend-title">
          {unitName}
        </div>
      </div>
  
      return (
        <Card title={title} bordered={false} className="map-legend" size="small">
          <div className="map-legend-content">
            <div
              className="legend"
              style={{backgroundImage: `linear-gradient(+45deg, ${gradientColors})`}}
            />
            <div className="numbers-wrapper">
              <ul className="numbers">
                {legendDOM}
              </ul>
            </div>
          </div>
        </Card>
      );
    }

    return null;
  }
  
}
  
const legendState = state => ({
  selectedSubcategory: state.map.selectedSubcategory,
});

export default connect(legendState, null)(MapLegend);