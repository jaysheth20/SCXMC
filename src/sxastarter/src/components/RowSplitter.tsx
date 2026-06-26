import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: ComponentProps): JSX.Element => {
  const params = props.params || {};
  const styles = `${params.GridParameters ?? ''} ${params.Styles ?? ''}`.trimEnd();
  const rowStyles = [
    params.Styles1,
    params.Styles2,
    params.Styles3,
    params.Styles4,
    params.Styles5,
    params.Styles6,
    params.Styles7,
    params.Styles8,
  ];
  const enabledPlaceholders = (params.EnabledPlaceholders || '').split(',').filter(Boolean);
  const id = params.RenderingIdentifier;

  return (
    <div className={`component row-splitter ${styles}`} id={id ? id : undefined}>
      {enabledPlaceholders.map((ph, index) => {
        const phKey = `row-${ph}-{*}`;
        const phStyles = `${rowStyles[+ph - 1] ?? ''}`.trimEnd();

        return (
          <div key={index} className={`container-fluid ${phStyles}`.trimEnd()}>
            <div key={index}>
              <div key={index} className="row">
                <Placeholder key={index} name={phKey} rendering={props.rendering} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
