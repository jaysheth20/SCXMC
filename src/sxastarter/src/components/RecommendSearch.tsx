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

    // ✅ fetch recommended blogs whenever keyword changes
    useEffect(() => {
        if (!keyword || !uuid) return setBlogs([]);

        const loadRecommendations = async () => {
            try {
                const data: any = await fetchSearchResults("1003", keyword, uuid);
                const widget = data.widgets?.[0];
                setBlogs(widget?.content || []);
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

            {blogs.length > 0 && (
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
                            <h4 style={{ margin: "0 0 4px 0", fontSize: "14px" }}>{blog.name}</h4>
                            {blog.description && (
                                <p style={{ margin: "0 0 4px 0", fontSize: "12px", color: "#555" }}>
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
