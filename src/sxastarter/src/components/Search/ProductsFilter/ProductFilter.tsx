import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Slider from 'rc-slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useI18n } from 'next-localization';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

type ProductType = {
  MenufacturerFacet: object;
  CategoryFacet: object;
  PriceFilters: {
    MaximumPrice: number;
    MinimumPrice: number;
  };
  OnCategoryChange: any;
  OnMenufacturerChange: any;
  OnPriceRangeChange: any;
};

const ProductsFilter = (props: ProductType) => {
  const {
    PriceFilters,
    CategoryFacet,
    MenufacturerFacet,
    OnCategoryChange,
    OnMenufacturerChange,
    OnPriceRangeChange,
  } = props;

  const [filtersOpen, setFiltersOpen] = useState(false);
  const { t } = useI18n();

  return (
    <form className="products-filter">
      <button
        type="button"
        onClick={() => setFiltersOpen(!filtersOpen)}
        className={`products-filter__menu-btn ${
          filtersOpen ? 'products-filter__menu-btn--active' : ''
        }`}
      >
        {t('add-filter')} <i className="icon-down-open"></i>
      </button>
      <div
        className={`products-filter__wrapper ${
          filtersOpen ? 'products-filter__wrapper--open' : ''
        }`}
      >
        <div className="products-filter__block">
          <button type="button">{t('price')}</button>
          <div className="products-filter__block__content">
            <Range
              onAfterChange={OnPriceRangeChange}
              min={PriceFilters.MinimumPrice}
              max={PriceFilters.MaximumPrice}
              defaultValue={[PriceFilters.MinimumPrice, PriceFilters.MaximumPrice]}
              tipFormatter={(value) => `${value}`}
            />
          </div>
        </div>
        <div className="products-filter__block">
          <button type="button">{t('category')}</button>
          <div className="products-filter__block__content">
            {Object.keys(CategoryFacet).map((key, index) => (
              <FormControlLabel
                key={key}
                className="d-block"
                control={
                  <Checkbox name={'product-cate_' + key} value={key} onChange={OnCategoryChange} />
                }
                label={key + ' (' + Object.values(CategoryFacet)[index] + ')'}
              />
            ))}
          </div>
        </div>
        <div className="products-filter__block">
          <button type="button">{t('manufacturer')}</button>
          <div className="products-filter__block__content">
            {Object.keys(MenufacturerFacet).map((key, index) => (
              <FormControlLabel
                className="d-block"
                key={key}
                control={
                  <Checkbox
                    name={'product-menuf_' + key}
                    value={key}
                    onChange={OnMenufacturerChange}
                  />
                }
                label={key + ' (' + Object.values(MenufacturerFacet)[index] + ')'}
              />
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductsFilter;
