import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

import { GiftCard } from 'src/components/Product/Models/ProductDetailType';

interface GiftcardformProps {
  giftCard?: GiftCard;
  handleGiftCardChange: any;
}

const Giftcardform = (props: GiftcardformProps) => {
  const { giftCard, handleGiftCardChange } = props;
  const [recipientName, setRecipientName] = useState(giftCard?.RecipientName);
  const [recipientEmail, setRecipientEmail] = useState(giftCard?.RecipientEmail);
  const [senderName, setSenderName] = useState(giftCard?.SenderName);
  const [senderEmail, setSenderEmail] = useState(giftCard?.SenderEmail);
  const [message, setMessage] = useState(giftCard?.Message);

  useEffect(() => {
    const giftcard: GiftCard = {
      IsGiftCard: true,
      RecipientEmail: recipientEmail,
      RecipientName: recipientName,
      SenderEmail: senderEmail,
      SenderName: senderName,
      Message: message,
      GiftCardType: giftCard?.GiftCardType ?? '',
    };
    handleGiftCardChange(giftcard);
  }, [recipientName, recipientEmail, senderName, senderEmail, message]);

  return (
    <form noValidate className={'form'}>
      <div className={'my-3'}>
        <TextField
          label={"Recipient's Name"}
          type={'text'}
          required={true}
          fullWidth
          value={recipientName}
          error={!recipientName}
          helperText={recipientName ? '' : 'Please enter recipient name'}
          onChange={(e) => setRecipientName(e.target.value)}
        />
      </div>

      <div className={'my-3'}>
        <TextField
          label={"Recipient's Email"}
          type={'email'}
          required={true}
          fullWidth
          value={recipientEmail}
          error={!recipientEmail}
          helperText={recipientEmail ? '' : 'Please enter recipient email'}
          onChange={(e) => setRecipientEmail(e.target.value)}
        />
      </div>
      <div className={'my-3'}>
        <TextField
          label={'Your Name'}
          type={'text'}
          required={true}
          fullWidth
          value={senderName}
          error={!senderName}
          helperText={senderName ? '' : 'Please enter sender name'}
          onChange={(e) => setSenderName(e.target.value)}
        />
      </div>
      <div className={'my-3'}>
        <TextField
          label={'Your Email'}
          type={'email'}
          required={true}
          fullWidth
          value={senderEmail}
          error={!senderEmail}
          helperText={senderEmail ? '' : 'Please enter sender email'}
          onChange={(e) => setSenderEmail(e.target.value)}
        />
      </div>
      <div className={'my-3'}>
        <TextField
          label={'Message'}
          fullWidth
          value={message}
          multiline
          rows={4}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
    </form>
  );
};

export default Giftcardform;
