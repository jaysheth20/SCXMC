import React from 'react';
import { Field, withDatasourceCheck, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { ComponentProps } from 'lib/component-props';

type FAQ = {
  fields: {
    Question: Field<string>;
    Answer: Field<string>;
  };
};

type FAQListProps = ComponentProps & {
  fields: {
    Heading: Field<string>;
    FAQList: FAQ[];
  };
};
const FAQ = (props: FAQListProps) => {
  const fields = props.fields;
  return (
    <section className="cart">
      <div className="container">
        <h2>{fields.Heading.value}</h2>
        <div className="accordion">
          {fields.FAQList.map((item, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                {item.fields.Question.value}
              </AccordionSummary>
              <AccordionDetails>
                <RichText field={item.fields.Answer} />
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default withDatasourceCheck()<FAQListProps>(FAQ);
