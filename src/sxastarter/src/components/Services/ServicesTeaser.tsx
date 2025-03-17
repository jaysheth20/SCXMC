import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { ServiceFields, ServicesProps, Default as Services } from 'src/atoms/Services/Services';
import useStore from 'src/State/useStore';

interface ServicesTeaserFields {
  Services: Array<Service>;
}

interface Service {
  fields: ServiceFields;
}

type ServicesTeaserProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: ServicesTeaserFields;
};
export const Default = (props: ServicesTeaserProps): JSX.Element => {
  const { count, increase, decrease, reset } = useStore();
  const id = props.params.RenderingIdentifier;
  console.log('Service props', props);
  return (
    <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        {props.fields.Services.map((service, index) => {
          const serviceProps: ServicesProps = {
            params: props.params,
            fields: service.fields,
          };
          return <Services params={serviceProps.params} key={index} {...service}></Services>;
        })}
      </div>
      <div>
        <h1>Counter: {count}</h1>
        <button onClick={increase}>Increase</button>
        <button onClick={decrease}>Decrease</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};
