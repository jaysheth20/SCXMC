"use client";

import React, { useEffect, useState } from "react";
import { fetchSearchResults } from "../lib/sitecoreSearch";

interface RecommendSearchResultsProps {
    keyword: string;
}

interface BlogItem {
    id: string;
    name: string;
    description: string;
    author: string;
    type: string;
    url: string;
}

export default function RecommendSearchResults({ keyword }: RecommendSearchResultsProps) {
    const [results, setResults] = useState<BlogItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [uuid, setUuid] = useState<string>("");

    // ✅ Set uuid on client side
    useEffect(() => {
        const cookieValue = typeof document !== "undefined" ? document.cookie.match(/bx_guest_ref=([^;]+)/)?.[1] : undefined;
        setUuid(cookieValue || `visitor-${Math.random().toString(36).slice(2, 11)}`);
    }, []);

    // ✅ fetch results on keyword change
    useEffect(() => {
        if (!keyword || !uuid) return setResults([]);

        const loadResults = async () => {
            try {
                setLoading(true);
                const data = (await fetchSearchResults("1003", keyword, uuid)) as { widgets?: Array<{ content?: BlogItem[] }> };
                const widget = data.widgets?.[0];
                let items: BlogItem[] = widget?.content || [];

                // 🔹 filter client-side for better accuracy
                items = items.filter((b) =>
                    b.name?.toLowerCase().includes(keyword.toLowerCase())
                );

                setResults(items);
            } catch (err) {
                console.error("❌ Error fetching recommended blogs:", err);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        loadResults();
    }, [keyword, uuid]);

    if (!keyword) return null;

    return (
        <div style={{ marginTop: "1rem" }}>
            <h4>Recommended Blogs:</h4>
            {loading ? (
                <p>Loading...</p>
            ) : results.length === 0 ? (
                <p>No recommendations found.</p>
            ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                    {results.map((item) => (
                        <div
                            key={item.id}
                            style={{
                                width: "250px",
                                border: "1px solid #ddd",
                                borderRadius: "6px",
                                padding: "12px",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <h4>{item.name}</h4>
                            <p style={{ fontSize: "14px", color: "#333" }}>
                                {item.description || "No description."}
                            </p>
                            {item.author && (
                                <p style={{ fontWeight: "bold", fontSize: "13px", color: "#555" }}>
                                    Author: {item.author}
                                </p>
                            )}
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                style={{ marginTop: "auto", color: "#2563eb" }}
                            >
                                Read More →
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
