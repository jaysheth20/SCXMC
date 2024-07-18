import { ChangeEvent, useEffect, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useI18n } from 'next-localization';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import {
  ShippingAddressList,
  ShippingAddress,
  StorePickup,
} from 'src/components/Checkout/FormModel/ShippingAddress';
import ShippingAddressForm from 'src/components/Checkout/Forms/ShippingAddressForm';
import { ShippingMethodReq } from 'src/components/Checkout/FormModel/ShippingMethodModel';
import * as CheckoutService from 'src/services/CheckoutService';
import LoadingScreen from 'components/LoadingScreen';
interface ShippingAddressSectionProps {
  handleNext: any;
  handleBack: any;
  handleSetPickup: any;
}

const ShippingAddressSection = (props: ShippingAddressSectionProps) => {
  const { handleNext, handleBack, handleSetPickup } = props;
  const [selectedAddress, setselectedAddress] = useState('0');
  const [selectedPickup, setselectedPickup] = useState(0);
  const [selectedPickupName, setselectedPickupName] = useState('');
  const [isPickupAddress, setIsPickupAddress] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddressList>();
  const [storePickup, setStorePickup] = useState<StorePickup>();
  const [hideContinue, sethideContinue] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [intailFormValues] = useState<ShippingAddress>({
    Id: 0,
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
    fetchPickup();
  }, []);

  const fetchAddress = () => {
    setShippingAddress({ Addresses: [] });
    CheckoutService.getShippingAddress()
      .then((res) => {
        setShippingAddress(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchPickup = () => {
    setShippingAddress({ Addresses: [] });
    CheckoutService.getPickupPoints()
      .then((res) => {
        setStorePickup(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderPickups = () => {
    if (storePickup?.PickupPoints) {
      return (
        <div className="checkbox-color-wrapper">
          <div className="select-wrapper">
            <select value={selectedPickup} onChange={(e) => changePickupSelection(e)}>
              <option value="0">{t('select-pickup-point')}</option>
              {storePickup.PickupPoints.map((item) => (
                <option key={item.Id} value={item.Id}>
                  {item.Name} - {item.City}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    }
    return <LoadingScreen />;
  };

  const renderAddressList = () => {
    if (shippingAddress?.Addresses) {
      return (
        <div className="checkbox-color-wrapper">
          <div className="select-wrapper">
            <select value={selectedAddress} onChange={(e) => handleAddressSelection(e)}>
              <option value="0">{t('select-shipping-address-option')}</option>
              <option value="New">{t('new-address')}</option>
              {shippingAddress.Addresses.map((item) => (
                <option key={item.Id} value={item.Id}>
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
    } else if (event.target.value === '0') {
      handleHideContinue(true);
      setShowAddressForm(false);
      setselectedAddress(event.target.value);
    } else {
      setShowAddressForm(false);
      handleHideContinue(false);
      setselectedAddress(event.target.value);
    }
  };

  const changePickupSelection = (event: ChangeEvent<HTMLSelectElement>) => {
    setselectedPickup(parseInt(event.target.value));
    if (event.target.value != '0') {
      const selectedPickup = storePickup?.PickupPoints.filter((x) => x.Id == event.target.value)[0];
      setselectedPickupName(selectedPickup?.Id + '___' + selectedPickup?.ProviderSystemName);
      handleHideContinue(false);
    } else {
      handleHideContinue(true);
    }
    setShowAddressForm(false);
  };

  const selectBillingAdderss = () => {
    if (isPickupAddress && selectedPickup !== 0) {
      setSubmitting(true);
      const req: ShippingMethodReq = {
        IsPickup: true,
        PickupPointName: selectedPickupName,
        ShippingMethodName: '',
      };
      CheckoutService.selectShippingMethod(req)
        .then((res) => {
          if (res.status === 200) {
            setSubmitting(false);
            if (isPickupAddress) {
              handleNext(2);
              handleSetPickup(true);
            } else {
              handleNext(1);
              handleSetPickup(false);
            }
          }
        })
        .catch((err) => {
          setSubmitting(false);
          console.log(err);
        });
    } else {
      setSubmitting(true);
      CheckoutService.selectShippingAddress(selectedAddress)
        .then((res) => {
          setSubmitting(false);
          if (res.status === 200) {
            handleNext(1);
          }
        })
        .catch((err) => {
          setSubmitting(false);
          console.log(err);
        });
    }
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

  const handleChackedChange = (isChecked: boolean) => {
    setselectedPickup(0);
    setselectedAddress('0');
    handleHideContinue(true);
    setIsPickupAddress(isChecked);
  };

  return (
    <>
      <div className="row">
        <div className={'col-md-4'}></div>
        <div className={'col-md-4'}>
          <div className={'my-3'}>
            <FormControlLabel
              className="primary-label"
              value={isPickupAddress}
              control={
                <Checkbox
                  className="primary-label"
                  onChange={(e) => handleChackedChange(e.target.checked)}
                />
              }
              label="Pick up"
            />
          </div>
          <div className={'my-3'}>
            <>
              {isPickupAddress ? renderPickups() : null}
              {isPickupAddress == false ? renderAddressList() : null}
            </>
          </div>
          {showAddressForm && isPickupAddress == false ? (
            <ShippingAddressForm
              InitialValues={intailFormValues}
              handleAddressSubmition={handleAddressSubmition}
            ></ShippingAddressForm>
          ) : null}

          <Box sx={{ mb: 2 }}>
            <div>
              <Button
                variant="outlined"
                className="btn btn--rounded btn--border"
                onClick={() => handleBack(1)}
                sx={{ mt: 1, mr: 1 }}
              >
                {t('back')}
              </Button>
              {hideContinue == false ? (
                <>
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

export default ShippingAddressSection;
