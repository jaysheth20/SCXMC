import React from 'react';
import { Field, RichText as JssRichText } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Text: Field<string>;
}

export type RichTextProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: RichTextProps): JSX.Element => {
  console.log('RichText props:', props);
  const text = props.fields ? (
    <JssRichText field={props.fields.Text} />
  ) : (
    <span className="is-empty-hint">Rich text</span>
  );
  const params = props.params || {};
  const id = params.RenderingIdentifier;

  return (
    <div
      className={`component rich-text ${(params.styles || '').trimEnd()}`}
      id={id ? id : undefined}
    >
      <div className="component-content">{text}</div>
    </div>
  );
};
