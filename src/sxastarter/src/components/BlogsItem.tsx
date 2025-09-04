import React from 'react';
import { Field, ImageField, Text, RichText, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';

interface BlogsitemFields {
    fields: {
        'Blog Title': Field<string>;
        'Blog Description': Field<string>;
        Author: Field<string>;
        Image: ImageField;

    };
}

const BlogsItem = (props: BlogsitemFields): JSX.Element => {
    const { fields } = props;

    return (
        <div className="rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">
                <Text field={fields['Blog Title']} />
            </h3>

            <div className="text-gray-700 mb-3">
                {/* Use RichText so HTML (<strong>) renders properly */}
                <RichText field={fields['Blog Description']} />
            </div>

            <span className="text-sm text-gray-500 italic">
                By <Text field={fields.Author} />
            </span>
            <JssImage field={props.fields.Image} />

        </div>
    );
};

export default BlogsItem;
