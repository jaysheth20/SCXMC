import React from 'react';
import { Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import CheckIcon from '@mui/icons-material/Check';

import { ComponentProps } from 'lib/component-props';

type Benefit = {
  fields: {
    KeyFeature: Field<string>;
  };
};

type FeatureBenefitsProps = ComponentProps & {
  fields: {
    Heading: Field<string>;
    KeyList: Benefit[];
  };
};
const KeyFeature = (props: FeatureBenefitsProps) => {
  const fields = props.fields;
  return (
    <section className="cart">
      <div className="container">
        <h2>{fields.Heading.value}</h2>
        <div className="row">
          <ul>
            {fields.KeyList.map((item, index) => (
              <li className="mb-2" key={index}>
                <CheckIcon></CheckIcon> {item.fields.KeyFeature.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default withDatasourceCheck()<FeatureBenefitsProps>(KeyFeature);
