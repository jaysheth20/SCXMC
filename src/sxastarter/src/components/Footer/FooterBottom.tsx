import { Field, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';
type FooterDescriptionProps = {
  fields: {
    Text: Field<string>;
  };
};
const FooterBottom = (props: FooterDescriptionProps) => {
  const fields = props.fields;
  return (
    <div className="site-footer__bottom">
      <div className="container">
        <RichText field={fields.Text} />
      </div>
    </div>
  );
};

export default FooterBottom;
