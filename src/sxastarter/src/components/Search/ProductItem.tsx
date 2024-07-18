import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ItemSearchResult } from 'src/components/Search/SearchResultType';
import { useAppSelector } from 'src/store/StoreHook';
import config from 'temp/config';

type ProductItemProps = {
  product: ItemSearchResult;
};

const ProductItem = (props: ProductItemProps) => {
  const { product } = props;
  const router = useRouter();
  const publicUrl = config.publicUrl;
  const wishlist = useAppSelector((state) => state.wishlist);

  return (
    <div className="product-item">
      <div className="product__image">
        <button
          type="button"
          className={`btn-heart ${
            wishlist.wishlistItems?.find((x) => x.ProductId.toString() == product.ProductId)
              ? 'btn-heart--active'
              : ''
          }`}
        >
          <i className="icon-heart"></i>
        </button>
        <Link onClick={() => router.push(`/product?pid=${product.ProductId}`)} href="#">
          <img
            src={product.ImageUrl ? product.ImageUrl : `${publicUrl}/default-product-image.png`}
            alt="product"
          />
        </Link>
      </div>

      <div className="product__description">
        <h3>{product.ProductName}</h3>
        <h3>
          {product.ShortDescription
            ? product.ShortDescription.length <= 18
              ? product.ShortDescription
              : product.ShortDescription.substr(0, 30) + '...'
            : ''}
        </h3>
        <div className={'product__price '}>
          <h4>{product.Price}</h4>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
