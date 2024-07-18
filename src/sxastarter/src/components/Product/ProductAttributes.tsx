import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { ProductAttribute, Value } from 'src/components/Product/Models/ProductDetailType';

interface ProductAttributesProps {
  attributes: ProductAttribute[];
  onChangeName: any;
}
const ProductAttributes = (props: ProductAttributesProps) => {
  const { attributes, onChangeName } = props;

  const renderAttributeDropdown = (item: ProductAttribute) => {
    if (!item.Values) {
      return null;
    }
    return (
      <div className="select-wrapper">
        <select
          id={'product_attribute_' + item.ProductAttributeId}
          key={item.ProductAttributeId}
          defaultValue={item.DefaultValue != null ? item.DefaultValue : '0'}
          name={'product_attribute_' + item.Id}
          onChange={onChangeName}
        >
          <option key={'nonkey' + item.ProductAttributeId} value="0">
            None
          </option>
          {item.Values.map((option: Value) => (
            <option key={option.Id} value={option.Id}>
              {option.Name} [{option.PriceAdjustment}]
            </option>
          ))}
        </select>
      </div>
    );
  };

  const renderAttributeRedio = (item: ProductAttribute) => {
    if (!item.Values) {
      return null;
    }
    return (
      <RadioGroup name={'product_attribute_' + item.Id} onChange={onChangeName}>
        {item.Values.map((option: Value) => (
          <FormControlLabel
            key={option.Id}
            control={<Radio value={option.Id} />}
            label={`${option.Name}[` + `${option.PriceAdjustment}]`}
          />
        ))}
      </RadioGroup>
    );
  };

  const renderAttributeCheckbox = (item: ProductAttribute) => {
    if (!item.Values) {
      return null;
    }
    return item.Values.map((option: Value) => (
      <FormControlLabel
        key={option.Id}
        control={
          <Checkbox
            name={'product_attribute_' + option.Id}
            value={option.Id}
            onChange={onChangeName}
          />
        }
        label={`${option.Name}`}
      />
    ));
  };

  return (
    <>
      {attributes.map((item, index) => (
        <div key={index} className="product-filter-item">
          <h5>
            {' '}
            {`${item.Name}: `} {item.IsRequired ? '*' : ''}{' '}
          </h5>
          {item.AttributeControlType == 'DropdownList' ? (
            <div className="checkbox-color-wrapper">{renderAttributeDropdown(item)}</div>
          ) : null}
          {item.AttributeControlType == 'RadioList' ? (
            <div className="checkbox-color-wrapper">{renderAttributeRedio(item)}</div>
          ) : null}
          {item.AttributeControlType == 'Checkboxes' ? (
            <div className="checkbox-color-wrapper"> {renderAttributeCheckbox(item)} </div>
          ) : null}
        </div>
      ))}
    </>
  );
};

export default ProductAttributes;
