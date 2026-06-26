"use client";

import { useState } from "react";
import SearchResults from "./SearchResults";

export default function SearchBox() {
    const [keyword, setKeyword] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchTerm(keyword.trim());
    };

    return (
        <div className="search-experience">
            <div className="search-shell">
                <form onSubmit={handleSearch} className="search-form">
                    <div className="search-input-wrap">
                        <span className="search-input-icon">Search</span>
                        <input
                            type="text"
                            placeholder="Type to search..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="search-input"
                            aria-label="Search input"
                        />
                        <button type="submit" className="search-submit">
                            Search
                        </button>
                    </div>
                </form>
            </div>

            {searchTerm && <SearchResults rfkId="1001" keyword={searchTerm} />}
        </div>
    );
}
