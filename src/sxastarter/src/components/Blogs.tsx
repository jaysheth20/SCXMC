import React, { useState } from 'react';
import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import Blogsitem from './BlogsItem';
import { loadEngage } from '../lib/engageClient';

interface Fields {
    Heading: Field<string>;
    BlogList: BlogsitemFields[];
}

interface BlogsitemFields {
    id: string;
    fields: {
        BlogTitle: Field<string>;
        BlogDescription: Field<string>;
        Author: Field<string>;
    };
}

export type BlogsProps = {
    fields: Fields;
};

const GRAPH_QL_ENDPOINT =
    'https://xmc-sourceved15434-jsitecorexmc413-dev0494.sitecorecloud.io/sitecore/api/graph/edge';

const SEARCH_QUERY = `
  query SearchBlogs($searchText: String!) {
    search(
      where: {
        AND: [
          { name: "_templates", value: "{554AB7F8-6E55-47CA-A3C0-EF0DFA5C2257}", operator: EQ }
          { name: "_language", value: "en", operator: EQ }
          {
            OR: [
              { name: "Blog Title", value: $searchText, operator: CONTAINS }
              { name: "Blog Description", value: $searchText, operator: CONTAINS }
              { name: "Author", value: $searchText, operator: CONTAINS }
            ]
          }
        ]
      }
    ) {
      results {
        id
        name
        blogTitle: field(name: "Blog Title") {
          value
        }
        blogDescription: field(name: "Blog Description") {
          value
        }
        author: field(name: "Author") {
          value
        }
        image: field(name: "Image") {
          jsonValue
        }
      }
    }
  }
`;

export const Default = (props: BlogsProps): JSX.Element => {
    const [searchText, setSearchText] = useState('');
    const [blogs, setBlogs] = useState<BlogsitemFields[]>(props.fields.BlogList || []);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchText.trim()) return;

        setLoading(true);
        try {
            const response = await fetch(GRAPH_QL_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'sc_apikey': 'B12D98C5-FB7B-48AE-8BF9-EBF7B0546DC9',
                },
                body: JSON.stringify({
                    query: SEARCH_QUERY,
                    variables: { searchText },
                }),
            });

            const data = await response.json();
            const results = data?.data?.search?.results || [];

            const mappedBlogs: BlogsitemFields[] = results.map((item: any) => ({
                id: item.id,
                fields: {
                    BlogTitle: { value: item.blogTitle?.value },
                    BlogDescription: { value: item.blogDescription?.value },
                    Author: { value: item.author?.value },
                    Image: item.image?.jsonValue,
                },
            }));

            setBlogs(mappedBlogs);

            // 👉 Send events to Sitecore CDP
            const engage = await loadEngage();

            // 1️⃣ PAGE VIEW with dynamic search keyword
            await engage.pageView({
                channel: 'WEB',
                currency: 'USD',
                language: 'en',
                page: "blogs2" // fixed value
            });

            // 2️⃣ SEARCH event with keyword + results count
            const eventData = {
                channel: 'WEB',
                currency: 'USD',
                pointOfSale: 'jSitecoreXMC',
                language: 'EN',
                page: 'blogs',
                product_name: searchText, // 👈 searched keyword
                product_type: 'BLOG', // 👈 static type
            };
            await engage.event('SEARCH', eventData);

            console.log(`✅ Search + PageView events sent to CDP for keyword: ${searchText}`);
        } catch (error) {
            console.error('❌ Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-default">
            {/* Search Bar */}
            <div className="mb-6 flex gap-2">
                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                >
                    Search
                </button>
            </div>

            {/* Heading */}
            <h1 className="component title row">
                <Text field={props.fields.Heading} />
            </h1>

            {/* Blog List */}
            {loading ? (
                <p>Loading...</p>
            ) : blogs.length > 0 ? (
                <div className="hero-items grid gap-6 md:grid-cols-2">
                    {blogs.map((item) => (
                        // @ts-ignore

                        <Blogsitem key={item.id} fields={item.fields as any} />
                    ))}
                </div>
            ) : (
                <p>No blogs found.</p>
            )}
        </div>
    );
};
