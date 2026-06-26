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
  const columnWidths = [
    params.ColumnWidth1,
    params.ColumnWidth2,
    params.ColumnWidth3,
    params.ColumnWidth4,
    params.ColumnWidth5,
    params.ColumnWidth6,
    params.ColumnWidth7,
    params.ColumnWidth8,
  ];
  const columnStyles = [
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
    <div className={`row component column-splitter ${styles}`} id={id ? id : undefined}>
      {enabledPlaceholders.map((ph, index) => {
        const phKey = `column-${ph}-{*}`;
        const phStyles = `${columnWidths[+ph - 1]} ${columnStyles[+ph - 1] ?? ''}`.trimEnd();

        return (
          <div key={index} className={phStyles}>
            <div key={index} className="row">
              <Placeholder key={index} name={phKey} rendering={props.rendering} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
