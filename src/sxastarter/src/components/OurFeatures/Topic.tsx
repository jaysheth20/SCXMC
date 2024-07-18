import React from 'react';
import {
  Field,
  ImageFieldValue,
  withDatasourceCheck,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';

import { ComponentProps } from 'lib/component-props';
type Topic = {
  Heading: Field<string>;
  Description: Field<string>;
  Image: Field<ImageFieldValue>;
  ImagePosition: Field<string>;
};
type TopicProps = ComponentProps & {
  fields: Topic;
};

const RenderImageBottom = (props: Topic) => {
  return (
    <div className="row">
      {props.Heading.value ? <h3>{props.Heading.value}</h3> : ''}
      {props.Description.value ? <RichText field={props.Description} /> : ''}
      {props.Image.value ? <img className="bottom-image" src={props.Image.value.src} alt="" /> : ''}
    </div>
  );
};

const RenderImageTop = (props: Topic) => {
  return (
    <div className="row">
      {props.Image.value ? <img src={props.Image.value.src} alt="" /> : ''}
      {props.Heading.value ? <h3>{props.Heading.value}</h3> : ''}
      {props.Description.value ? <RichText field={props.Description} /> : ''}
    </div>
  );
};
const RenderImageLeft = (props: Topic) => {
  return (
    <div className="row">
      <div className="col-md-6">
        {props.Image.value ? <img src={props.Image.value.src} alt="" /> : ''}
      </div>
      <div className="col-md-6">
        {props.Heading.value ? <h3>{props.Heading.value}</h3> : ''}
        {props.Description.value ? <RichText field={props.Description} /> : ''}
      </div>
    </div>
  );
};
const RenderImageRight = (props: Topic) => {
  return (
    <div className="row">
      <div className="col-md-6">
        {props.Heading.value ? <h3>{props.Heading.value}</h3> : ''}
        {props.Description.value ? <RichText field={props.Description} /> : ''}
      </div>
      <div className="col-md-6">
        {props.Image.value ? <img height={250} src={props.Image.value.src} alt="" /> : ''}
      </div>
    </div>
  );
};

const Topic = (props: TopicProps) => {
  const { fields } = props;
  return (
    <>
      <div className="cart">
        <div className="container">
          <div className="row">
            {fields.ImagePosition.value === 'Right' ? RenderImageRight(fields) : ''}
            {fields.ImagePosition.value === 'Left' ? RenderImageLeft(fields) : ''}
            {fields.ImagePosition.value === 'Top' ? RenderImageTop(fields) : ''}
            {fields.ImagePosition.value === 'Bottom' ? RenderImageBottom(fields) : ''}
          </div>
        </div>
      </div>
    </>
  );
};

export default withDatasourceCheck()<TopicProps>(Topic);
