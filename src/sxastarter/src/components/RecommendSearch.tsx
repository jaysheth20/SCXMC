"use client";

import React, { useState, useEffect } from "react";
import { fetchSearchResults } from "../lib/sitecoreSearch";

interface BlogItem {
    id: string;
    name: string;
    description: string;
    author: string;
    type: string;
    url: string;
}

interface RecommendSearchProps {
    onSelectSuggestion?: (keyword: string) => void;
}

const RecommendSearch: React.FC<RecommendSearchProps> = ({ onSelectSuggestion }) => {
    const [keyword, setKeyword] = useState("");
    const [blogs, setBlogs] = useState<BlogItem[]>([]);
    const [uuid, setUuid] = useState<string>("");

    // ✅ read cookie only on client
    useEffect(() => {
        const cookieValue = document.cookie.match(/bx_guest_ref=([^;]+)/)?.[1];
        setUuid(cookieValue || "visitor-" + Math.random().toString(36).substr(2, 9));
    }, []);

    // ✅ fetch only when user starts typing
    useEffect(() => {
        if (!uuid || keyword.length === 0) {
            setBlogs([]);
            return;
        }

        const loadRecommendations = async () => {
            try {
                const data: any = await fetchSearchResults("1003", "", uuid); // fetch all blogs
                const widget = data.widgets?.[0];
                let items: BlogItem[] = widget?.content || [];

                // Apply filtering only if keyword has 4+ characters
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

    const handleSelect = (blog: BlogItem) => {
        setKeyword(blog.name);
        setBlogs([]);
        if (onSelectSuggestion) onSelectSuggestion(blog.name);
    };

    return (
        <div style={{ position: "relative", marginBottom: "1rem" }}>
            <input
                type="text"
                placeholder="Type to get recommendations..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ padding: "6px 12px", width: "250px" }}
            />

            {/* ✅ show popup only when keyword has >=1 character */}
            {keyword.length > 0 && blogs.length > 0 && (
                <div
                    style={{
                        position: "absolute",
                        top: "36px",
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
                            {blog.author && (
                                <p style={{ margin: 0, fontSize: "11px", color: "#888" }}>
                                    Author: {blog.author}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecommendSearch;
