import React from 'react';
import { Field, ImageField, Text, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Heading: Field<string>;
  Image: ImageField;
}

export type BannerProps = {
  fields: Fields;
};

export const Default = (props: BannerProps): JSX.Element => {
  const { fields } = props;
  console.log('Banner props:', props);
  return (
    <div className="container-default">
      <h1 className="component title row">
        <Text field={fields.Heading} />
        <JssImage field={props.fields.Image} />
      </h1>
    </div>
  );
};
