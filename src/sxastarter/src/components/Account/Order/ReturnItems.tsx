import React from 'react';
import { useI18n } from 'next-localization';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { ReturnItem } from 'components/Account/Models/ReturnOrderTypes';

interface ReturnItemsProps {
  returnItems: ReturnItem[];
  handleChange: any;
}

const ReturnItems = (props: ReturnItemsProps) => {
  const { returnItems, handleChange } = props;
  const { t } = useI18n();
  const renderQty = (qty: number) => {
    const qtyArry = [];
    for (let index = 1; index <= qty; index++) {
      qtyArry.push(index);
    }
    return qtyArry.map((item) => (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    ));
  };

  return (
    <div className="return-order-list">
      <table>
        <thead>
          <tr>
            <th>{t('product')}</th>
            <th>{t('unit-price')}</th>
            <th>{t('qty-to-return')}</th>
          </tr>
        </thead>
        <tbody>
          {returnItems?.map((item) => (
            <tr key={`${item.Id}-row`}>
              <td>{item.ProductName}</td>
              <td>{item.UnitPrice}</td>
              <td>
                <TextField
                  className=""
                  name={item.Id.toString()}
                  defaultValue={0}
                  select
                  onChange={handleChange}
                >
                  <MenuItem value={0}>0</MenuItem>
                  {renderQty(item.Quantity)}
                </TextField>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReturnItems;
