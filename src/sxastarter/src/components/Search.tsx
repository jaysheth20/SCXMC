"use client";

import React, { useState, useEffect, useRef } from "react";
import { fetchSearchResults } from "../lib/sitecoreSearch";
import SearchResults from "./SearchResults";
import { getItemLabel, SearchItem, highlightSearchTerm, buildSuggestionList } from "../lib/searchUtils";

interface SearchBoxProps {
    rfkId?: string; // the widget ID for recommendations
}

const SearchBox: React.FC<SearchBoxProps> = ({ rfkId = "1003" }) => {
    const [query, setQuery] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
    const [rawSuggestions, setRawSuggestions] = useState<SearchItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const skipNextSuggestionRef = useRef(false);

    // Fetch raw suggestions once
    useEffect(() => {
        const loadSuggestions = async () => {
            try {
                setLoading(true);
                const data = await fetchSearchResults(rfkId, undefined);
                const results = data?.widgets?.[0]?.content || [];
                setRawSuggestions(results);
            } catch (err) {
                console.error("Error loading search suggestions:", err);
                setRawSuggestions([]);
            } finally {
                setLoading(false);
            }
        };
        loadSuggestions();
    }, [rfkId]);

    // Client-side suggestions filtering (works with partial queries >= 3 chars)
    useEffect(() => {
        if (skipNextSuggestionRef.current) {
            skipNextSuggestionRef.current = false;
            return;
        }

        if (!query || query.trim().length < 3) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const filtered = buildSuggestionList(rawSuggestions, query, 5);
        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
    }, [query, rawSuggestions]);

    // Click outside handler to dismiss suggestions
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (item: SearchItem) => {
        const label = getItemLabel(item);
        skipNextSuggestionRef.current = true;
        setQuery(label);
        setSearchTerm(label);
        setShowSuggestions(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        skipNextSuggestionRef.current = true;
        setSearchTerm(query.trim());
        setShowSuggestions(false);
    };

    return (
        <div className="search-experience" ref={containerRef}>
            <div className="search-shell">
                <form onSubmit={handleSubmit} className="search-form">
                    <div className="search-input-wrap">
                        <span className="search-input-icon">Quick Search</span>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Type to search..."
                            className="search-input"
                            aria-label="Quick search input"
                        />
                        <button type="submit" className="search-submit">
                            Search
                        </button>
                    </div>
                </form>

                {loading && query.trim().length >= 2 && (
                    <div style={{ padding: "10px", color: "#657892" }}>Loading suggestions...</div>
                )}

                {showSuggestions && suggestions.length > 0 && (
                    <div className="search-suggestions" role="listbox">
                        <span className="search-suggestions-header">Quick Results</span>
                        {suggestions.map((item) => {
                            const label = getItemLabel(item);
                            const highlightedTitle = highlightSearchTerm(label, query);

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    className="search-suggestion-card"
                                    style={{
                                        width: "100%",
                                        border: "none",
                                        background: "transparent",
                                        textAlign: "left",
                                        display: "block",
                                        outline: "none",
                                    }}
                                    onClick={() => handleSelect(item)}
                                >
                                    <div className="search-suggestion-meta">
                                        {item.type && <span>{item.type as string}</span>}
                                    </div>
                                    <h5
                                        className="search-suggestion-title"
                                        dangerouslySetInnerHTML={{ __html: highlightedTitle }}
                                    />
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {searchTerm && <SearchResults rfkId="1001" keyword={searchTerm} />}
        </div>
    );
};

export default SearchBox;
