import React from 'react';
import { connect } from 'react-redux';
import {
  Card, Button, Radio, Collapse,
  notification, Icon, Popover
} from 'antd';

const RadioGroup = Radio.Group;
const { Panel } = Collapse;

class LayersOptions extends React.Component {

  onLayerChange = (category, e) => {
    const subcategoryName = e.target.value.name;
    this.props.selectSelectedSubcategory(
      category.name, subcategoryName
    )
  }

  displaySubcategories = (subcategories) => {
    function renderSubCat(subCat) {
      if (subCat.disabled) {
        return (
          <Popover content={subCat.disabled.message} placement="right">
            <Radio 
              className="layer-option-radio"
              value={subCat} key={subCat.name}
              disabled 
            >
              {subCat.name}
            </Radio>
          </Popover>
        );
      }

      return (
        <Radio
          className="layer-option-radio"
          value={subCat}
          key={subCat.name}
        >
          {subCat.name}
        </Radio>
      );
    }

    if (subcategories.length) {
      return (
        subcategories.map(renderSubCat)
      );
    }
    return (<p>No default layers visible.</p>);
  }

  showNotification = (title, text) => notification.open({
    message: title,
    description: text,
    icon: <Icon type="frown" style={{ color: '#8B0000' }} />,
  });


  render() {
    const {
      visible,
      show,
      selectedSubcategory,
      categories,
    } = this.props;

    const optionsKey = categories && categories.length ? categories[0].name : 'none';
    // const optionsKey = selectedCategory.name || 'none';
    return (
      <div className="layers-options-container">
        <Card
          className="layers-card"
          title="Layers Options"
          extra={(
            <Button
              shape="circle"
              onClick={() => show(false)}
            >
              X
            </Button>
          )}
          style={{ width: 300, display: visible ? 'block' : 'none' }}
        >
          {
            categories.length > 0 ? (
              <Collapse defaultActiveKey={optionsKey} accordion>
                {categories.map(cat => (
                  <Panel header={cat.name} key={cat.name}>
                    <RadioGroup onChange={(e) => this.onLayerChange(cat, e)} value={selectedSubcategory}>
                      {this.displaySubcategories(cat.subcategories)}
                    </RadioGroup>
                  </Panel>
                ))
                }
              </Collapse>)
              : <p>No categories available</p>
          }
        </Card>
      </div>
    );
  }
}

const mapState = state => ({
  categories: state.map.categories,
  selectedCategory: state.map.selectedCategory,
  selectedSubcategory: state.map.selectedSubcategory,
  visible: !state.controls.hidden,
});

const mapDispatch = dispatch => ({
  selectSelectedSubcategory: (categoryName, subcategoryName) => dispatch.map.selectSelectedSubcategory(categoryName, subcategoryName),
});

export default connect(mapState, mapDispatch)(LayersOptions);
