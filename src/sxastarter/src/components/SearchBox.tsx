// components/SearchBox.tsx
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


            {/* 🔎 pass searchTerm into results */}
            <SearchResults rfkId="1001" keyword={searchTerm} />
        </div>
    );
}
