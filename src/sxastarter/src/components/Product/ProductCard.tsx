import * as React from 'react';
import Rating from '@mui/material/Rating';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Product } from 'src/components/Product/Models/ProductInterface';
import { useAppSelector } from 'src/store/StoreHook';

interface ProductCardProps {
  product: Product;
}

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;
  const router = useRouter();
  const wishlist = useAppSelector((state) => state.wishlist);

  return (
    <div className="product-item">
      <div className="product__image">
        <button
          type="button"
          className={`btn-heart ${
            wishlist.wishlistItems?.find((x) => x.ProductId === product.Id)
              ? 'btn-heart--active'
              : ''
          }`}
        >
          <i className="icon-heart"></i>
        </button>
        <Link onClick={() => router.push(`/product?pid=${product.Id}`)} href="#">
          <img src={product.PictureModels ? product.PictureModels[0].ImageUrl : ''} alt="product" />
          {product.ProductPrice.OldPrice && (
            <span className="product__discount">{product.ProductPrice.OldPrice}</span>
          )}
        </Link>
      </div>
      <div className="product__description">
        <h3>{product.Name}</h3>
        <h3>
          {product.ShortDescription
            ? product.ShortDescription.length <= 18
              ? product.ShortDescription
              : product.ShortDescription.substr(0, 30) + '...'
            : ''}
        </h3>
        <div
          className={
            'product__price ' + (product.ProductPrice.OldPrice ? 'product__price--discount' : '')
          }
        >
          <h4>{product.ProductPrice.Price}</h4>

          {product.ProductPrice && <span>{product.ProductPrice.OldPrice}</span>}
        </div>
        <Rating name="read-only" value={product.ReviewOverviewModel.RatingSum} readOnly />
      </div>
    </div>
  );
};

export default ProductCard;
