import React from 'react';
import { Field, ImageFieldValue, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import NextLink from 'next/link';

import { ComponentProps } from 'lib/component-props';
import { RouteFields } from 'lib/component-props/RouteFields';

type Item = ComponentProps & {
  fields: {
    FeatureName: Field<string>;
    FeatureSortDescription: Field<string>;
    FeatureIconCss: Field<string>;
    FeatureCover: Field<ImageFieldValue>;
    pageTitle: Field<string>;
  };
  url: string;
};

type FeatureListProps = {
  fields: {
    items: Item[];
  };
};

const FeatureList = (props: FeatureListProps) => {
  const { items } = props.fields;
  const value = useSitecoreContext();
  const contentItemFields = value.sitecoreContext.route?.fields as RouteFields;
  return (
    <section className="section">
      <div className="container">
        <header className="section__intro">
          <h4>{contentItemFields.pageTitle.value}</h4>
        </header>

        <ul className="shop-data-items">
          {items.map((item, index) => (
            <NextLink href={item.url} key={index}>
              <li>
                <i className={item.fields.FeatureIconCss.value}></i>
                <div className="data-item__content">
                  <h4>{item.fields.FeatureName.value}</h4>
                  <p>{item.fields.FeatureSortDescription.value}</p>
                </div>
              </li>
            </NextLink>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeatureList;
