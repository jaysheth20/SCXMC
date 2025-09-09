// SearchBox.tsx
import { useState } from "react";
import SearchResults from "./SearchResults";

export default function SearchBox() {
    const [keyword, setKeyword] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchTerm(keyword); // trigger new search
    };

    return (
        <div>
            <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    style={{ padding: "6px 12px", width: "250px" }}
                />
                <button type="submit" style={{ marginLeft: "0.5rem", padding: "6px 12px" }}>
                    Search
                </button>
            </form>

            {/* pass keyword into results */}
            <SearchResults rfkId="1001" keyword={searchTerm} />
        </div>
    );
}
