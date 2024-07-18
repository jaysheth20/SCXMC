import React, { useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';

import ListHead from 'src/components/Search/ProductsFilter/ListHead';
import { ItemSearchResult, SearchResults } from 'src/components/Search/SearchResultType';
import ProductItem from 'src/components/Search/ProductItem';
import ProductsFilter from 'src/components/Search/ProductsFilter/ProductFilter';
import { ComponentProps } from 'lib/component-props';
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';
import { fetchWishlistData } from 'src/store/Wishlist';
import { searchProduct } from 'src/services/ProductService';
import { trackSearchEvent } from 'src/services/TrackingService';
import { useAppDispatch, useAppSelector } from 'src/store/StoreHook';

type SearchResultsProps = ComponentProps & {
  fields: {
    result: SearchResults;
  };
};

const Search = (props: SearchResultsProps) => {
  const { result } = props.fields;
  const categoryFacet = result.CategoryFacet;
  const menufacturerFacet = result.MenufacturerFacet;
  const priceFilters = result.PriceFilters;
  const sortSettings = result.SortSettings;
  const displayRecordsPerPage = result.DisplayRecordsPerPages;
  const [searchResult, setSearchResult] = useState<ItemSearchResult[]>(result.ItemSearchResults);
  const [searchText, setSearchText] = useState('');
  const [manufacturersFilter, setmanufacturersFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [minPrice, setMinPrice] = useState(priceFilters.MinimumPrice);
  const [maxPrice, setMaxPrice] = useState(priceFilters.MaximumPrice);
  const [sort, setSort] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const wishlist = useAppSelector((state) => state.wishlist);
  const [selectedMenufacturer, setSelectedMenufacturer] = useState<any>([]);
  const [selectedcategory, setSelectedCategory] = useState<any>([]);
  const [pagging, setPagging] = useState(Math.ceil(result.TotalResults / pageSize));
  const dispatcher = useAppDispatch();

  useEffect(() => {
    if (wishlist.Loading === true) {
      dispatcher(fetchWishlistData());
    }
  }, [wishlist]);

  useEffect(() => {
    setCategoryFilter(selectedcategory.join(','));
    setPageNumber(1);
  }, [selectedcategory]);

  useEffect(() => {
    setmanufacturersFilter(selectedMenufacturer.join(','));
    setPageNumber(1);
  }, [selectedMenufacturer]);

  useEffect(() => {
    const GlobalSearchRequest = {
      SearchText: searchText.length >= 3 ? searchText : '',
      PageNumber: pageNumber - 1,
      PageSize: pageSize,
      SearchInDescription: false,
      MinPrice: minPrice,
      MaxPrice: maxPrice,
      Sort: sort,
      FacetCategories: categoryFilter,
      FacetManufacturers: manufacturersFilter,
    };
    searchProduct(GlobalSearchRequest)
      .then((response) => {
        if (response.data.ItemSearchResults) {
          setSearchResult(response.data.ItemSearchResults);
          setPagging(Math.ceil(response.data.TotalResults / pageSize));
        }
      })
      .catch((error) => {
        console.log(error);
      });
    if (searchText.length >= 3) {
      trackSearchEvent(GlobalSearchRequest);
    }
  }, [
    pageSize,
    sort,
    manufacturersFilter,
    categoryFilter,
    pageNumber,
    searchText,
    minPrice,
    maxPrice,
  ]);

  const onPageSizeChange = (event: SelectChangeEvent) => {
    setPageSize(parseInt(event.target.value));
    setPageNumber(1);
  };

  const onSortChange = (event: SelectChangeEvent) => {
    setSort(parseInt(event.target.value));
    setPageNumber(1);
  };

  const onPageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  const onPriceRangeChange = (event: any) => {
    setMinPrice(event[0]);
    setMaxPrice(event[1]);
    setPageNumber(1);
  };

  const onCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked == true) {
      if (selectedcategory.length > 0) {
        setSelectedCategory([...selectedcategory, event.target.value]);
      } else {
        setSelectedCategory([event.target.value]);
      }
    } else {
      setSelectedCategory([...selectedcategory.filter((e: any) => e !== event.target.value)]);
    }
  };

  const onSearchTextChange = (event: SelectChangeEvent) => {
    setSearchText(event.target.value);
    setPageNumber(1);
  };

  const onMenufacturerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked == true) {
      if (selectedMenufacturer.length > 0) {
        setSelectedMenufacturer([...selectedMenufacturer, event.target.value]);
      } else {
        setSelectedMenufacturer([event.target.value]);
      }
    } else {
      setSelectedMenufacturer([
        ...selectedMenufacturer.filter((e: any) => e !== event.target.value),
      ]);
    }
  };

  return (
    <>
      <Breadcrumb />
      <section className="products-page">
        <div className="container">
          <ProductsFilter
            OnPriceRangeChange={onPriceRangeChange}
            OnMenufacturerChange={onMenufacturerChange}
            OnCategoryChange={onCategoryChange}
            MenufacturerFacet={menufacturerFacet}
            CategoryFacet={categoryFacet}
            PriceFilters={priceFilters}
          />
          <section className="products-content">
            <div className="products-content__intro d-block">
              <ListHead
                searchText={searchText}
                OnSearchTextChange={onSearchTextChange}
                OnPageSizeChange={onPageSizeChange}
                OnSortChange={onSortChange}
                pageSize={pageSize}
                DisplayRecordsPerPages={displayRecordsPerPage}
                sortOn={sort}
                SortSettings={sortSettings}
              />
            </div>
            {searchResult && (
              <>
                <section className="products-list">
                  {searchResult.map((item: ItemSearchResult) => (
                    <ProductItem product={item} key={item.ProductId} />
                  ))}
                </section>
                <div className="row">
                  <Pagination onChange={onPageChange} count={pagging} color="primary" />
                </div>
              </>
            )}
          </section>
        </div>
      </section>
    </>
  );
};

export default Search;
