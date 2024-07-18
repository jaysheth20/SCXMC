import { Field, LinkFieldValue } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';
type Links = {
  fields: {
    Name: Field<string>;
    Link: Field<LinkFieldValue>;
  };
};

type FooterLinksProps = {
  fields: {
    SectionHeader: Field<string>;
    Links: Links[];
  };
};

const FooterLinks = (props: FooterLinksProps) => {
  const fields = props.fields;
  return (
    <ul>
      {<li>{fields.SectionHeader.value}</li>}
      {fields.Links.map((link, index) => (
        <li key={index}>
          <a href={link.fields.Link.value.href || '/'}>{link.fields.Name.value}</a>
        </li>
      ))}
    </ul>
  );
};

export default FooterLinks;
