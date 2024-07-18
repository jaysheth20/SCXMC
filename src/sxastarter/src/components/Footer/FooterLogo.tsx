import { Field, ImageFieldValue, RichText } from '@sitecore-jss/sitecore-jss-nextjs';

type FooterLogoProps = {
  fields: {
    Logo: Field<ImageFieldValue>;
    Description: Field<string>;
    SiteName: Field<string>;
  };
};
const FooterLogo = (props: FooterLogoProps) => {
  const { fields } = props;
  return (
    <>
      <h6>
        <img width={50} src={fields.Logo.value.src} alt="" /> <RichText field={fields.SiteName} />
      </h6>
      <RichText field={fields.Description} />
    </>
  );
};

export default FooterLogo;
