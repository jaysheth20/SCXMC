"use client";

import React, { useState, useEffect } from "react";
import { fetchSearchResults } from "../lib/sitecoreSearch";
import RecommendSearch from "./RecommendSearch";

interface SearchBoxProps {
    rfkId?: string; // the widget ID for recommendations
}

const SearchBox: React.FC<SearchBoxProps> = ({ rfkId = "1003" }) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch suggestions whenever the query changes (debounced)
    useEffect(() => {
        if (!query) {
            setSuggestions([]);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);
            try {
                const data = await fetchSearchResults(rfkId, query);
                // Assuming suggestions are in widget.items[0].suggestionResults
                const results = data?.widget?.items?.[0]?.search?.suggestionResults || [];
                setSuggestions(results);
            } catch (err) {
                console.error("Error fetching search suggestions:", err);
            } finally {
                setLoading(false);
            }
        }, 300); // debounce 300ms

        return () => clearTimeout(timer);
    }, [query, rfkId]);

    return (
        <div style={{ marginTop: "1rem" }}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search..."
                style={{ padding: "0.5rem", width: "300px" }}
            />
            {loading && <p>Loading suggestions...</p>}

            {suggestions.length > 0 && (
                <div style={{ border: "1px solid #ccc", marginTop: "0.5rem", padding: "0.5rem" }}>
                    <RecommendSearch items={suggestions} />
                </div>
            )}
        </div>
    );
};

export default SearchBox;
