// pages/search.tsx
import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
import { SEARCH_BLOGS } from "../graphql/queries";

function SearchPage() {
    const [searchText, setSearchText] = useState("");
    const [searchBlogs, { loading, data, error }] = useLazyQuery(SEARCH_BLOGS);

    const handleSearch = () => {
        if (searchText.trim()) {
            searchBlogs({ variables: { searchText } });
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Blog Search (Raw JSON)</h1>

            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search blogs..."
                    className="border p-2 w-64 rounded"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Search
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error.message}</p>}

            {data && (
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                    {JSON.stringify(data, null, 2)}
                </pre>
            )}
        </div>
    );
}

export default function WrappedSearchPage() {
    return (
        <ApolloProvider client={client}>
            <SearchPage />
        </ApolloProvider>
    );
}
