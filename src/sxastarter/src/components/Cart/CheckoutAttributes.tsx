import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { CheckoutAttribute, Value } from 'src/components/Cart/Models/ShoppingCartType';

interface CheckoutAttributesProps {
  attributes: CheckoutAttribute[];
  onChangeName: any;
}

const CheckoutAttributes = (props: CheckoutAttributesProps) => {
  const { attributes, onChangeName } = props;

  const renderAttributeDropdown = (item: CheckoutAttribute) => {
    if (!item.Values) {
      return null;
    }
    return (
      <div className="select-wrapper">
        <select
          id={'checkout_attribute_' + item.Id}
          key={item.Id}
          value={item.Values.find((x) => x.IsPreSelected)?.Id}
          name={'checkout_attribute_' + item.Id}
          onChange={onChangeName}
        >
          {item.Values.map((option: Value) => (
            <option key={option.Id} value={option.Id}>
              {option.Name} {option.PriceAdjustment ? '[' + option.PriceAdjustment + ']' : ''}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const renderAttributeRedio = (item: CheckoutAttribute) => {
    if (!item.Values) {
      return null;
    }
    return (
      <RadioGroup name={'checkout_attribute_' + item.Id} onChange={onChangeName}>
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

  const renderAttributeCheckbox = (item: CheckoutAttribute) => {
    if (!item.Values) {
      return null;
    }
    return item.Values.map((option: Value) => (
      <FormControlLabel
        key={option.Id}
        control={
          <Checkbox
            name={'checkout_attribute_' + option.Id}
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
      {attributes && attributes.length > 0
        ? attributes.map((item, index) => (
            <div className="row" key={index}>
              <div className="col-md-3">
                <label>
                  {' '}
                  {`${item.Name}: `} {item.IsRequired ? '*' : ''}{' '}
                </label>
              </div>
              <div className="col-md-6">
                {item.AttributeControlType == 'DropdownList' ? (
                  <div className="checkbox-color-wrapper">{renderAttributeDropdown(item)}</div>
                ) : null}
                {item.AttributeControlType == 'RadioList' ? (
                  <div className="checkbox-color-wrapper">{renderAttributeRedio(item)}</div>
                ) : null}
                {item.AttributeControlType == 'Checkboxes' ? (
                  <div className="checkbox-color-wrapper">{renderAttributeCheckbox(item)}</div>
                ) : null}
              </div>
            </div>
          ))
        : null}
    </>
  );
};

export default CheckoutAttributes;
