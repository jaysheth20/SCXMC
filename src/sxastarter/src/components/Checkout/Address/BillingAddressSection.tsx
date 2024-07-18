import { ChangeEvent, useEffect, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useI18n } from 'next-localization';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import AddressForm from 'src/components/Checkout/Forms/AddressForm';
import { AddressList, BillingAddress } from 'src/components/Checkout/FormModel/BillingAddress';
import * as CheckoutService from 'src/services/CheckoutService';
import LoadingScreen from 'components/LoadingScreen';

interface BillingAddressSectionProps {
  handleNext: any;
  handleShipToSameAddress: any;
}

const BillingAddressSection = (props: BillingAddressSectionProps) => {
  const { handleNext, handleShipToSameAddress } = props;
  const [selectedAddress, setselectedAddress] = useState('0');
  const [shipToSameAddress, setShipToSameAddress] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [billingAddress, setBillingAddress] = useState<AddressList>();
  const [hideContinue, sethideContinue] = useState(true);
  const [fatchAddressRecord, setFatchAddressRecord] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [intailFormValues, setIntailFormValues] = useState<BillingAddress>({
    Id: 0,
    ShipToSameAddress: shipToSameAddress,
    VatNumber: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Company: '',
    CountryId: 0,
    StateProvinceId: 0,
    Country: '',
    City: '',
    Address1: '',
    Address2: '',
    ZipPostalCode: '',
    PhoneNumber: '',
    FaxNumber: '',
  });
  const { t } = useI18n();

  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = () => {
    setBillingAddress({ Addresses: [] });
    CheckoutService.getAddresses()
      .then((res) => {
        setBillingAddress(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderAddressList = () => {
    if (billingAddress?.Addresses) {
      return (
        <div className="checkbox-color-wrapper">
          <div className="select-wrapper">
            <select value={selectedAddress} onChange={(e) => handleAddressSelection(e)}>
              <option value="0">{t('select-billing-address')}</option>
              <option value="New">{t('new-address')}</option>
              {billingAddress.Addresses.map((item) => (
                <option key={item.Id} value={item.Id?.toString()}>
                  {item.FirstName + '' + ' ' + item.LastName}, {item.City}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    }
    return <LoadingScreen />;
  };

  const handleAddressSelection = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'New') {
      setShowAddressForm(true);
      handleHideContinue(true);
      setselectedAddress(event.target.value);
    } else if (event.target.value == '0') {
      sethideContinue(true);
      setselectedAddress(event.target.value);
    } else {
      setShowAddressForm(false);
      handleHideContinue(false);
      setselectedAddress(event.target.value);
    }
  };

  const selectBillingAdderss = () => {
    setSubmitting(true);
    CheckoutService.selectBillingAdderss(selectedAddress, shipToSameAddress)
      .then((res) => {
        if (res.status === 200) {
          setSubmitting(false);
          if (shipToSameAddress) {
            handleShipToSameAddress(true);
            handleNext(2);
          } else {
            handleNext(1);
            handleShipToSameAddress(false);
          }
        }
      })
      .catch((err) => {
        setSubmitting(false);
        console.log(err);
      });
  };

  const handleAddressSubmition = (selectedId: string) => {
    fetchAddress();
    handleHideContinue(false);
    setShowAddressForm(false);
    setselectedAddress(selectedId);
  };

  const handleHideContinue = (isHide: boolean) => {
    sethideContinue(isHide);
  };

  const handleEditAddress = () => {
    setShowAddressForm(true);
    setFatchAddressRecord(true);

    CheckoutService.getAddressById(selectedAddress)
      .then((res) => {
        const address = res.data.Address;
        console.log(res.data.Address);
        setIntailFormValues({
          Id: address.Id,
          ShipToSameAddress: shipToSameAddress,
          VatNumber: address.VatNumber,
          FirstName: address.FirstName,
          LastName: address.LastName,
          Email: address.Email,
          Company: address.Company,
          CountryId: address.CountryId,
          StateProvinceId: address.StateProvinceId,
          Country: address.Company,
          City: address.City,
          Address1: address.Address1,
          Address2: address.Address2,
          ZipPostalCode: address.ZipPostalCode,
          PhoneNumber: address.PhoneNumber,
          FaxNumber: address.FaxNumber,
        });
        setFatchAddressRecord(false);
        handleHideContinue(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteAddress = () => {
    CheckoutService.deleteAddress(selectedAddress)
      .then(() => {
        fetchAddress();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="row">
        <div className={'col-md-4'}></div>
        <div className={'col-md-4'}>
          <div className={'my-3'}>
            <div className="checkbox-color-wrapper">
              <FormControlLabel
                className="primary-label"
                control={
                  <Checkbox
                    className="primary-label"
                    onChange={(e) => setShipToSameAddress(e.target.checked)}
                  />
                }
                label={t('ship-to-same-address')}
              />
            </div>
          </div>
          <div className={'my-3'}>{renderAddressList()}</div>
          {showAddressForm ? (
            fatchAddressRecord ? (
              <LoadingScreen />
            ) : (
              <AddressForm
                InitialValues={intailFormValues}
                handleAddressSubmition={handleAddressSubmition}
              ></AddressForm>
            )
          ) : null}

          <Box sx={{ mb: 2 }}>
            <div>
              {hideContinue == false ? (
                <>
                  <Button
                    className="btn btn--rounded btn--yellow"
                    variant="contained"
                    onClick={() => handleEditAddress()}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {t('edit')}
                  </Button>
                  <Button
                    className="btn btn--rounded btn--yellow"
                    variant="contained"
                    onClick={() => handleDeleteAddress()}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {t('delete')}
                  </Button>
                  <Button
                    className="btn btn--rounded btn--yellow"
                    variant="contained"
                    onClick={() => selectBillingAdderss()}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={submitting}
                  >
                    {submitting ? t('loading') : t('continue')}
                  </Button>
                </>
              ) : null}
            </div>
          </Box>
        </div>
        <div className="col-md-4"></div>
      </div>
    </>
  );
};

export default BillingAddressSection;
