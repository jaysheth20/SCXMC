import React from 'react';
import { Field, withDatasourceCheck, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { ComponentProps } from 'lib/component-props';

type Benefit = {
  fields: {
    Title: Field<string>;
    Description: Field<string>;
  };
};

type FeatureBenefitsProps = ComponentProps & {
  fields: {
    Heading: Field<string>;
    Description: Field<string>;
    List: Benefit[];
  };
};
const FeatureBenefits = (props: FeatureBenefitsProps) => {
  const fields = props.fields;
  return (
    <section className="cart">
      <div className="container">
        <h2>{fields.Heading.value}</h2>
        <div className="row">
          {fields.List.map((item, index) => (
            <div key={index} className="col-md-6">
              <Card sx={{ margin: 1 }} variant="outlined">
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {item.fields.Title.value}
                    <RichText field={item.fields.Description} />
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default withDatasourceCheck()<FeatureBenefitsProps>(FeatureBenefits);
