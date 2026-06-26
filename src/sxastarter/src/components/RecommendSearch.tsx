"use client";

import React, { useEffect, useState } from "react";
import { fetchSearchResults } from "../lib/sitecoreSearch";
import { buildSuggestionList, getItemLabel, SearchItem } from "../lib/searchUtils";

interface RecommendSearchProps {
  onSelectSuggestion?: (keyword: string) => void;
  items?: unknown[];
}

const RecommendSearch: React.FC<RecommendSearchProps> = ({ onSelectSuggestion }) => {
  const [keyword, setKeyword] = useState("");
  const [blogs, setBlogs] = useState<SearchItem[]>([]);
  const [uuid, setUuid] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cookieValue = document.cookie.match(/bx_guest_ref=([^;]+)/)?.[1];
    setUuid(cookieValue || `visitor-${Math.random().toString(36).slice(2, 11)}`);
  }, []);

  useEffect(() => {
    if (!uuid || keyword.trim().length < 2) {
      setBlogs([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await fetchSearchResults("1003", keyword, uuid);
        const widget = data.widgets?.[0];
        const items: SearchItem[] = widget?.content || [];

        setBlogs(buildSuggestionList(items, keyword, 6));
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [keyword, uuid]);

  const handleSelect = (blog: SearchItem) => {
    const label = getItemLabel(blog);
    setKeyword(label);
    setBlogs([]);
    onSelectSuggestion?.(label);
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

      {loading && keyword.trim().length >= 2 && <p style={{ marginTop: "8px" }}>Loading recommendations...</p>}

      {keyword.trim().length >= 2 && blogs.length > 0 && (
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
            <button
              key={blog.id}
              type="button"
              style={{
                width: "100%",
                padding: "8px",
                border: "none",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
                background: "transparent",
                textAlign: "left",
              }}
              onClick={() => handleSelect(blog)}
            >
              <h4 style={{ margin: "0 0 4px 0", fontSize: "14px" }}>{getItemLabel(blog)}</h4>
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
              {blog.author && <p style={{ margin: 0, fontSize: "11px", color: "#888" }}>Author: {blog.author}</p>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendSearch;
