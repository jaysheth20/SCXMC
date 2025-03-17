import React from 'react';
import { Field, RichText as JssRichText } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: Field<string>;
  Description: Field<string>;
}

export type TitleDescriptionProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: TitleDescriptionProps): JSX.Element => {
  const title = props.fields ? (
    <h2>{props.fields.Title.value}</h2>
  ) : (
    <span className="is-empty-hint">Title is empty</span>
  );

  const description = props.fields ? (
    <JssRichText field={props.fields.Description} />
  ) : (
    <span className="is-empty-hint">Description is empty</span>
  );

  const id = 'props.params.RenderingIdentifier';

  return (
    <div className="component title-description" id={id ? id : undefined}>
      <div className="component-content">
        {title}
        {description}
      </div>
    </div>
  );
};
