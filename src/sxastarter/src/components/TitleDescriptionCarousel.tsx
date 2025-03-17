import React from 'react';
import {
  Field,
  ComponentParams,
  ComponentRendering,
  RichText as JssRichText,
  Placeholder,
  RouteData,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: Field<string>;
  Description: Field<string>;
  Carousel: Field<ImageField[]>;
}

interface ImageField {
  url: string;
}

interface TitleDescriptionCarouselProps {
  rendering: ComponentRendering;
  params: ComponentParams;
  fields: Fields;
  route: RouteData;
}

export const Default = (props: TitleDescriptionCarouselProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  // Get the route data
  const route = sitecoreContext.route;
  console.log('route', route);
  const title = props.fields?.Title ? (
    <h2>{props.fields.Title.value}</h2>
  ) : (
    <span className="is-empty-hint">Title is empty</span>
  );

  const description = props.fields?.Description ? (
    <JssRichText field={props.fields.Description} tag="section" editable={true} />
  ) : (
    <span className="is-empty-hint">Description is empty</span>
  );
  console.log('props', props);
  const images = props.fields?.Carousel || [];
  return (
    <div className="component title-description-carousel" id={props.params.RenderingIdentifier}>
      {route && <Placeholder name="my-custom-components" rendering={route} />}
      <div className="component-content">
        {title}
        {description}
        <div className="image-carousel">
          {images.map((image: ImageField, index: number) => (
            <img key={index} src={image.url} alt={`Image ${index + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
};
