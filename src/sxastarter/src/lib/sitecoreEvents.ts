// lib/sitecoreEvents.ts
import { SearchItem } from './searchUtils';

export async function trackWidgetViewEvent({
  rfkId,
  uuid,
  requestId,
  interactionId,
  results,
}: {
  rfkId: string;
  uuid: string;
  requestId: string;
  interactionId?: string;
  results: SearchItem[];
}) {
  const endpoint = "https://discover.sitecorecloud.io/discover/v2/128591118/events"; // 👈 /events endpoint
  const apiKey =
    "01-69b141fb-5eaec29094dc20b453087d784b7bf4283555fe18";

  // Map results into the "entities" structure
  const entities = results.map((item) => ({
    id: item.id,
    entity_type: "content",
    entity_subtype: item.type || "article",
    attributes: {
      title: item.title,
      ...(item.author && { author: item.author }),
    },
  }));

  const body = {
    name: "widget",
    action: "view",
    uuid,
    client_time_ms: Date.now(),
    page_load_time_ms: 500, // can be measured
    request_id: requestId,
    interaction_id: interactionId || "interaction-" + Date.now(),
    value: {
      rfk_id: rfkId,
      entities,
      request: {
        keyword: "", // optionally pass search keyword
        num_results: results.length,
        total_results: results.length,
        num_requested: results.length,
        page_size: results.length,
      },
    },
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error("❌ Widget view event failed:", res.status, await res.text());
  } else {
    console.log("✅ Widget view tracked:", await res.json());
  }
}
