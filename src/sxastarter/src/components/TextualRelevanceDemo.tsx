import React, { useState } from "react";

const TextRelevanceDemo: React.FC = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const endpoint = "https://discover.sitecorecloud.io/discover/v2/128591118"; // ✅ your accountId
    const apiKey = "01-69b141fb-5eaec29094dc20b453087d784b7bf4283555fe18"; // ✅ your API key

    const handleSearch = async () => {
        try {
            const body = {
                context: {
                    locale: { country: "us", language: "en" },
                    user: { uuid: "anonymous" },
                },
                widget: {
                    items: [
                        {
                            entity: "content",
                            rfk_id: "rfkid_7", // ✅ use the rfkId configured in Sitecore Search
                            search: {
                                content: {},
                                query: {
                                    keyphrase: query,
                                    options: {
                                        textualRelevance: {
                                            fields: {
                                                title: { boost: 3.0 },        // higher weight
                                                description: { boost: 1.5 }, // medium weight
                                                body: { boost: 1.0 },        // normal
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    ],
                },
            };

            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    Authorization: apiKey, // 👈 not "Bearer"
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                throw new Error(`❌ Search failed: ${res.status} ${res.statusText}`);
            }

            const data = await res.json();
            setResults(data?.widget?.items?.[0]?.response?.items || []);
        } catch (err) {
            console.error("Error fetching results:", err);
        }
    };

    return (
        <div style={{ padding: "1rem", border: "1px solid #ddd", marginTop: "2rem" }}>
            <h2>📖 Textual Relevance Demo</h2>
            <input
                type="text"
                placeholder="Enter keyword..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ padding: "0.5rem", width: "250px" }}
            />
            <button onClick={handleSearch} style={{ marginLeft: "0.5rem", padding: "0.5rem" }}>
                Search
            </button>

            <div style={{ marginTop: "1rem" }}>
                {results.length > 0 ? (
                    <ul>
                        {results.map((item, idx) => (
                            <li key={idx} style={{ marginBottom: "0.5rem" }}>
                                <strong>{item.values?.title?.[0]}</strong> <br />
                                <small>{item.values?.description?.[0]}</small>
                            </li>
                        ))}
                    </ul>
                ) : (
                    query && <p>No results found.</p>
                )}
            </div>
        </div>
    );
};

export default TextRelevanceDemo;
