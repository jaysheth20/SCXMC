import React from 'react';
import TextField from '@mui/material/TextField';
import { useI18n } from 'next-localization';

import { DisplayRecordsPerPage, SortSetting } from 'src/components/Search/SearchResultType';

type ListHeadProps = {
  DisplayRecordsPerPages: DisplayRecordsPerPage[];
  SortSettings: SortSetting[];
  pageSize: number;
  sortOn: number;
  OnPageSizeChange: any;
  OnSortChange: any;
  OnSearchTextChange: any;
  searchText: string;
};

const ListHead = (props: ListHeadProps) => {
  const {
    DisplayRecordsPerPages,
    SortSettings,
    pageSize,
    sortOn,
    OnPageSizeChange,
    OnSortChange,
    searchText,
    OnSearchTextChange,
  } = props;
  const { t } = useI18n();

  return (
    <form className={'products-content__filter'}>
      <div className="form__input-row search-input">
        <TextField
          type={'email'}
          required={true}
          fullWidth
          placeholder="Search"
          id="search"
          name="search"
          value={searchText}
          onChange={OnSearchTextChange}
        />
      </div>
      <div className="products__filter__select">
        <h4>{t('page-size')}: </h4>
        <div className="select-wrapper">
          <select onChange={OnPageSizeChange} defaultValue={pageSize}>
            {DisplayRecordsPerPages.map((item) => (
              <option key={item.Records} value={item.Records}>
                {item.Records}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="products__filter__select">
        <h4>{t('sort-by')}: </h4>
        <div className="select-wrapper">
          <select onChange={OnSortChange} defaultValue={sortOn}>
            {SortSettings.map((item) => (
              <option key={item.Id} value={item.Id}>
                {item.Name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
};

export default ListHead;
