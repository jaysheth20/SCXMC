import { Field, LinkFieldValue } from '@sitecore-jss/sitecore-jss-nextjs';

type Links = {
  fields: {
    Link: Field<LinkFieldValue>;
    IconCss: Field<string>;
  };
};

type FooterLinksProps = {
  fields: {
    Links: Links[];
  };
};
const SocialNetwork = (props: FooterLinksProps) => {
  const fields = props.fields;
  return (
    <ul className="site-footer__social-networks">
      {fields.Links.map((link, index) => (
        <li key={index}>
          <a href={link.fields.Link.value.href || '/'}>
            <i className={link.fields.IconCss.value}></i> {}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialNetwork;
