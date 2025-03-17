import React from 'react';
import { ComponentParams, Field, Text as JSSText } from '@sitecore-jss/sitecore-jss-nextjs';

export interface ServiceFields {
  Heading: Field<string>;
  Description: Field<string>;
  Image: Field<string>;
}
export interface ServicesProps {
  fields: ServiceFields;
  params: ComponentParams;
}

export const Default = (props: ServicesProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <p>
          <JSSText field={props.fields.Heading} />
        </p>
        <p>
          <JSSText field={props.fields.Description} />
        </p>
      </div>
    </div>
  );
};
