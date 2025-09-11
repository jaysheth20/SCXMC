"use client";

import React, { useState, useEffect } from "react";
import { fetchSearchResults } from "../lib/sitecoreSearch";
import SearchResults from "./SearchResults";

interface BlogItem {
    id: string;
    name: string;
    description: string;
    author: string;
    type: string;
    url: string;
}

export default function UnifiedSearch() {
    const [keyword, setKeyword] = useState("");
    const [blogs, setBlogs] = useState<BlogItem[]>([]);
    const [uuid, setUuid] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState(""); // for final search trigger

    // ✅ get bx_guest_ref (once on mount)
    useEffect(() => {
        const cookieValue = document.cookie.match(/bx_guest_ref=([^;]+)/)?.[1];
        setUuid(cookieValue || "visitor-" + Math.random().toString(36).substr(2, 9));
    }, []);

    // ✅ load recommendations on typing
    useEffect(() => {
        if (!uuid || keyword.length === 0) {
            setBlogs([]);
            return;
        }

        const loadRecommendations = async () => {
            try {
                const data: any = await fetchSearchResults("1003", "", uuid);
                const widget = data.widgets?.[0];
                let items: BlogItem[] = widget?.content || [];

                // 🔹 show all blogs for first 1–3 letters, filter only after 4+
                if (keyword.length >= 4) {
                    items = items.filter((b) =>
                        b.name?.toLowerCase().includes(keyword.toLowerCase())
                    );
                }

                setBlogs(items);
            } catch (err) {
                console.error("❌ Error fetching recommended blogs:", err);
                setBlogs([]);
            }
        };

        loadRecommendations();
    }, [keyword, uuid]);

    // ✅ select suggestion
    const handleSelect = (blog: BlogItem) => {
        setKeyword(blog.name);
        setBlogs([]);
        setSearchTerm(blog.name); // run full search
    };

    // ✅ submit search
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchTerm(keyword);
        setBlogs([]); // hide popup after search
    };

    return (
        <div style={{ position: "relative", marginBottom: "1rem" }}>
            {/* Search Input */}
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    style={{ padding: "6px 12px", width: "300px" }}
                />
                <button
                    type="submit"
                    style={{ marginLeft: "0.5rem", padding: "6px 12px" }}
                >
                    Search
                </button>
            </form>

            {/* Popup Suggestions */}
            {keyword.length > 0 && blogs.length > 0 && (
                <div
                    style={{
                        position: "absolute",
                        top: "40px",
                        left: 0,
                        width: "300px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        background: "#fff",
                        zIndex: 100,
                        maxHeight: "300px",
                        overflowY: "auto",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        padding: "8px",
                    }}
                >
                    {blogs.map((blog) => (
                        <div
                            key={blog.id}
                            style={{
                                padding: "8px",
                                borderBottom: "1px solid #eee",
                                cursor: "pointer",
                            }}
                            onClick={() => handleSelect(blog)}
                        >
                            <h4 style={{ margin: "0 0 4px 0", fontSize: "14px" }}>
                                {blog.name}
                            </h4>
                            {blog.description && (
                                <p
                                    style={{
                                        margin: "0 0 4px 0",
                                        fontSize: "12px",
                                        color: "#555",
                                    }}
                                >
                                    {blog.description}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Full Search Results */}
            {searchTerm && <SearchResults rfkId="1001" keyword={searchTerm} />}
        </div>
    );
}
