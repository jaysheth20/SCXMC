import React from "react";
import { SearchResultsWidget } from "@sitecore-search/react";

type Props = {
    rfkId: string | number;
};

const MySearchResultsWidget: React.FC<Props> = ({ rfkId }) => {
    return (
        <div className="my-search-widget">
            <SearchResultsWidget
                rfkId={1001} // 👈 use prop passed in
                viewType="list" // or "grid"
                fields={["name", "description", "author", "url", "image_url"]}
            />
        </div>
    );
};

export default MySearchResultsWidget;
