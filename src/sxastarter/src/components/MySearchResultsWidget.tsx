import React from "react";
import SearchResults from "./SearchResults";

type Props = {
    rfkId: string | number;
};

const MySearchResultsWidget: React.FC<Props> = ({ rfkId }) => {
    return (
        <div className="my-search-widget">
            <SearchResults
                rfkId={String(rfkId)}
            />
        </div>
    );
};

export default MySearchResultsWidget;
