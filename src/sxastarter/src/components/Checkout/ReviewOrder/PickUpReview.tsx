import React from 'react';

import { PickupAddress } from 'components/Cart/Models/ShoppingCartType';

interface PickUpReviewProps {
  pickupAddress: PickupAddress;
}

const PickUpReview = (props: PickUpReviewProps) => {
  const { pickupAddress } = props;

  return (
    <>
      <div className="row">
        {pickupAddress.Address1}
        {pickupAddress.Address2}
        {pickupAddress.City}
        {pickupAddress.StateProvinceName}
        {pickupAddress.CountryName}
        {pickupAddress.ZipPostalCode}
      </div>
    </>
  );
};

export default PickUpReview;
