import React, { useEffect, useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';

import { formikFieldAttrs, apiErrors2Formik } from 'src/lib/formUtils';
import ErrorSummary from 'src/components/ErrorSummary';
import { Country, States } from 'src/components/Checkout/FormModel/Country';
import { ShippingAddress } from 'src/components/Checkout/FormModel/ShippingAddress';
import * as CheckoutService from 'src/services/CheckoutService';

interface ShippingAddressFormProps {
  InitialValues: ShippingAddress;
  handleAddressSubmition: any;
}

const ShippingAddressForm = (props: ShippingAddressFormProps) => {
  const { InitialValues, handleAddressSubmition } = props;
  const [country, setCountry] = useState<Country[]>();
  const [states, setStates] = useState<States[]>();
  const [countryId, setCountryId] = useState(InitialValues.CountryId);
  const addressSchema = Yup.object().shape({
    FirstName: Yup.string().required('Please enter first name'),
    LastName: Yup.string().required('Please enter last name'),
    Company: Yup.string().required('Please enter company name'),
    City: Yup.string().required('please enter city'),
    Address1: Yup.string().required('Please enter address'),
    Address2: Yup.string().required('Please enter address'),
    ZipPostalCode: Yup.string().required('Please enter zip code'),
    PhoneNumber: Yup.string()
      .min(10, 'Pelase enter valid phone number')
      .max(10, 'Pelase enter valid phone number')
      .required('Please enter phone number'),
    Email: Yup.string().email('Please enter valid email').required('Please enter email'),
  });

  useEffect(() => {
    if (countryId && countryId != 0) {
      CheckoutService.getStates(countryId)
        .then((res) => {
          setStates(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [countryId]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const useSubmitBillingAddressForm = () => {
    const onSubmit = useCallback(
      (values: ShippingAddress, { setSubmitting, setErrors }: FormikHelpers<ShippingAddress>) => {
        values.CountryId = countryId;
        CheckoutService.addShippingAddress(values)
          .then(function (response) {
            if (response.data) {
              handleAddressSubmition(response.data);
            }
          })
          .catch(({ response: { data } }) => setErrors(apiErrors2Formik(data.Errors)))
          .finally(() => setSubmitting(false));
      },
      [countryId]
    );
    return {
      onSubmit,
    };
  };

  const { onSubmit } = useSubmitBillingAddressForm();

  const fetchCountries = () => {
    CheckoutService.getCountries()
      .then((res) => {
        setCountry(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderCountryList = () => {
    if (country) {
      return country.map((country) => (
        <MenuItem key={country.Id} value={country.Id}>
          {country.Name}
        </MenuItem>
      ));
    }
    return <MenuItem>loading...</MenuItem>;
  };

  const renderStateProvinceList = () => {
    if (states) {
      return states.map((state) => (
        <MenuItem key={state.id} value={state.id}>
          {state.name}
        </MenuItem>
      ));
    }
    return <MenuItem>loading...</MenuItem>;
  };

  const handleChangeCountry = (event: SelectChangeEvent) => {
    setCountryId(parseInt(event.target.value));
  };

  return (
    <>
      <Formik initialValues={InitialValues} validationSchema={addressSchema} onSubmit={onSubmit}>
        {(formikProps) => (
          <Form noValidate className={'bg-light p-3'}>
            <ErrorSummary />
            <div className={'my-3'}>
              <TextField
                label={'First Name'}
                type={'text'}
                required={true}
                fullWidth
                {...formikFieldAttrs<ShippingAddress>('FirstName', formikProps)}
              />
            </div>
            <div className={'my-3'}>
              <TextField
                label={'Last Name'}
                type={'text'}
                required={true}
                fullWidth
                {...formikFieldAttrs<ShippingAddress>('LastName', formikProps)}
              />
            </div>
            <div className={'my-3'}>
              <TextField
                label={'Email'}
                type={'email'}
                required={true}
                fullWidth
                {...formikFieldAttrs<ShippingAddress>('Email', formikProps)}
              />
            </div>
            <div className={'my-3'}>
              <TextField
                label={'Company'}
                type={'text'}
                fullWidth
                {...formikFieldAttrs<ShippingAddress>('Company', formikProps)}
              />
            </div>
            <div className={'my-3'}>
              <TextField
                label={'Country'}
                value={countryId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeCountry(e)}
                fullWidth
                select
              >
                <MenuItem value={0}>Select Country</MenuItem>
                {renderCountryList()}
              </TextField>
            </div>
            <div className={'my-3'}>
              <TextField
                label={'State /Province'}
                fullWidth
                select
                {...formikFieldAttrs<ShippingAddress>('StateProvinceId', formikProps)}
              >
                {states ? null : <MenuItem value={0}>Select state</MenuItem>}
                {renderStateProvinceList()}
              </TextField>
            </div>
            <div className={'my-3'}>
              <TextField
                label={'City'}
                type={'text'}
                required={true}
                fullWidth
                {...formikFieldAttrs<ShippingAddress>('City', formikProps)}
              />
            </div>
            <div className={'my-3'}>
              <TextField
                label={'Address1'}
                type={'text'}
                required={true}
                fullWidth
                {...formikFieldAttrs<ShippingAddress>('ConfirmPassword', formikProps)}
              />
            </div>
            <div className={'my-3'}>
              <TextField
                label={'Address2'}
                type={'text'}
                required={true}
                fullWidth
                {...formikFieldAttrs<ShippingAddress>('Address2', formikProps)}
              />
            </div>
            <div className={'my-3'}>
              <TextField
                label={'Zip/Postal code'}
                type={'text'}
                required={true}
                fullWidth
                {...formikFieldAttrs<ShippingAddress>('ZipPostalCode', formikProps)}
              />
            </div>
            <div className={'my-3'}>
              <TextField
                label={'Phone number'}
                type={'phone'}
                required={true}
                fullWidth
                {...formikFieldAttrs<ShippingAddress>('PhoneNumber', formikProps)}
              />
            </div>
            <div className={'my-3'}>
              <TextField
                label={'Fax'}
                type={'phone'}
                fullWidth
                {...formikFieldAttrs<ShippingAddress>('FaxNumber', formikProps)}
              />
            </div>
            <div className={'my-3 text-end'}>
              <Button
                variant="contained"
                className="btn btn--rounded btn--yellow"
                type={'submit'}
                disabled={formikProps.isSubmitting}
              >
                {formikProps.isSubmitting
                  ? 'Loading...'
                  : InitialValues.Id != 0
                  ? 'Update'
                  : 'Save'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ShippingAddressForm;
