import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import TextField from '@mui/material/TextField';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { CardDetail } from 'src/components/Checkout/FormModel/PaymentInformation';

interface CreditCartInformationProps {
  handleCardDetail: any;
  accteptedType: string[];
}

const CreditCartInformation = (props: CreditCartInformationProps) => {
  const { handleCardDetail, accteptedType } = props;
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [issuer, setIssuer] = useState('');

  useEffect(() => {
    const cardDetail: CardDetail = {
      CardholderName: name,
      CardNumber: number,
      ExpireMonth: month,
      ExpireYear: year,
      CardCode: cvc,
      CreditCardType: issuer,
    };
    handleCardDetail(cardDetail);
  }, [number, name, month, year, cvc, issuer]);

  const handleExpDate = (e: any) => {
    if (e && Object.prototype.toString.call(e.$d) !== 'Invalid Date' && !isNaN(e.$d)) {
      const month = e.$M + 1 < 9 ? '0' + (e.$M + 1) : e.$M + 1;
      setDate(month + '/' + e.$y);
      setMonth(month);
      setYear(e.$y);
    }
  };

  return (
    <>
      <div className="rccs__card">
        <Cards
          callback={(state: any) => {
            setIssuer(state.issuer);
          }}
          acceptedCards={accteptedType}
          number={number}
          name={name}
          expiry={date}
          issuer={issuer}
          cvc={cvc.replaceAll(/\d+/g, '*')}
        />
      </div>

      <br />
      <form>
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <TextField
              sx={{ my: '10px' }}
              label={'Card Number'}
              type={'text'}
              required={true}
              fullWidth
              value={number}
              name="number"
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
          </div>
          <div className="col-4"></div>
        </div>
        <br />
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <TextField
              sx={{ my: '10px' }}
              label={'Card Holder Name'}
              type={'text'}
              required={true}
              fullWidth
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="col-4"></div>
        </div>
        <br />
        <div className="row">
          <div className="col-4"></div>
          <div className="col-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                sx={{ my: '10px' }}
                label="Expiry Date"
                format="MM/YY"
                aria-placeholder="MM / YY"
                onChange={(e) => {
                  handleExpDate(e);
                }}
              />
            </LocalizationProvider>
          </div>
          <div className="col-2">
            <TextField
              sx={{ my: '10px' }}
              label={'CVV'}
              type={'password'}
              required={true}
              name="cvc"
              fullWidth
              value={cvc}
              InputProps={{
                inputProps: {
                  maxLength: 3,
                },
              }}
              onChange={(e) => {
                setCvc(e.target.value);
              }}
            />
          </div>
          <div className="col-4"></div>
        </div>
      </form>
    </>
  );
};

export default CreditCartInformation;
