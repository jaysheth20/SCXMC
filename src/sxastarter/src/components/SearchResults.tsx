"use client";

import { useEffect, useState } from "react";
import { fetchSearchResults } from "../lib/sitecoreSearch";
import { getCookie } from "../lib/cookies";

export default function SearchResults({ rfkId, keyword }: { rfkId: string; keyword?: string }) {
    const [results, setResults] = useState<any[]>([]);
    const [facets, setFacets] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedFacets, setSelectedFacets] = useState<{ [key: string]: string[] }>({});

    const [uuid] = useState<string>(() => {
        const cookieValue = getCookie("bx_guest_ref");
        return cookieValue || "visitor-" + Math.random().toString(36).substr(2, 9);
    });

    // ✅ Publish event
    const publishEvent = async (event: any) => {
        const endpoint = "https://discover.sitecorecloud.io/event/128591118-1164436/v4/publish";
        const apiKey = "01-69b141fb-5eaec29094dc20b453087d784b7bf4283555fe18";

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    Authorization: apiKey,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(event),
            });

            const data = await res.json();
            console.log("📌 Event published:", data);
        } catch (err) {
            console.error("❌ Error publishing event:", err);
        }
    };

    // ✅ Fetch results with keyword + apply filters locally
    const loadResults = async () => {
        try {
            setLoading(true);

            // fetch from API with keyword
            const data = await fetchSearchResults(rfkId, keyword, uuid);

            const widget = data.widgets?.[0];
            let resultsData = widget?.content || [];

            // apply facet filters locally
            Object.keys(selectedFacets).forEach((facetName) => {
                const values = selectedFacets[facetName];
                if (values.length > 0) {
                    resultsData = resultsData.filter((item) => values.includes(item[facetName]));
                }
            });

            // apply keyword filter locally (extra safety so search+filters behave the same)
            if (keyword && keyword.trim() !== "") {
                const lower = keyword.toLowerCase();
                resultsData = resultsData.filter(
                    (item) =>
                        item.title?.toLowerCase().includes(lower) ||
                        item.description?.toLowerCase().includes(lower) ||
                        item.author?.toLowerCase().includes(lower)
                );
            }

            setResults(resultsData);
            setFacets(widget?.facet || []);

            // publish view event
            if (resultsData.length > 0 && widget?.request_id) {
                await publishEvent({
                    name: "entity_page",
                    action: "view",
                    client_time_ms: Date.now(),
                    user_id: uuid,
                    value: {
                        context: { locale: { country: "us", language: "en" }, page: { uri: window.location.href } },
                        entities: resultsData.map((r: any) => ({
                            id: r.id,
                            uri: r.url,
                            entity_type: "content",
                        })),
                    },
                });
            }
        } catch (err) {
            console.error("❌ Error fetching search results:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadResults();
    }, [rfkId, uuid, keyword, selectedFacets]);

    const handleResultClick = async (item: any) => {
        await publishEvent({
            name: "entity_page",
            action: "click",
            client_time_ms: Date.now(),
            user_id: uuid,
            value: {
                context: { locale: { country: "us", language: "en" }, page: { uri: window.location.href } },
                entities: [
                    {
                        id: item.id,
                        uri: item.url,
                        entity_type: "content",
                    },
                ],
            },
        });
    };

    return (
        <div style={{ padding: "20px" }}>
            {/* Facets */}
            <div style={{ marginBottom: "20px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {facets.map((facet) => (
                    <div key={facet.name} style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                        {facet.value.map((v: any) => {
                            const isSelected = selectedFacets[facet.name]?.includes(v.text) || false;
                            return (
                                <button
                                    key={v.id}
                                    onClick={() => {
                                        setSelectedFacets((prev) => {
                                            const current = prev[facet.name] || [];
                                            const updated = current.includes(v.text)
                                                ? current.filter((x) => x !== v.text)
                                                : [...current, v.text];
                                            return { ...prev, [facet.name]: updated };
                                        });
                                    }}
                                    style={{
                                        padding: "4px 8px",
                                        borderRadius: "4px",
                                        border: "1px solid #ccc",
                                        cursor: "pointer",
                                        background: isSelected ? "#2563eb" : "#f3f3f3",
                                        color: isSelected ? "#fff" : "#000",
                                    }}
                                >
                                    {v.text} ({v.count})
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Grid */}
            {loading ? (
                <p>Loading...</p>
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
                            <h4>{item.title}</h4>
                            <p style={{ fontSize: "14px", color: "#333" }}>{item.description || "No description."}</p>
                            {item.author && (
                                <p style={{ fontWeight: "bold", fontSize: "13px", color: "#555" }}>Author: {item.author}</p>
                            )}
                            {item.image_url && (
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    style={{ maxWidth: "100%", marginTop: "8px", borderRadius: "4px" }}
                                />
                            )}
                            <div style={{ marginTop: "auto", marginTop: "12px" }}>
                                <a href={item.url} target="_blank" rel="noreferrer">
                                    Read More →
                                </a>
                                <button
                                    onClick={() => handleResultClick(item)}
                                    style={{
                                        marginTop: "6px",
                                        padding: "6px 12px",
                                        background: "#2563eb",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Track Click
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
