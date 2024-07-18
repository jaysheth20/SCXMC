import Skeleton from '@mui/material/Skeleton';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Product } from 'src/components/Product/Models/ProductInterface';
import ProductCard from 'src/components/Product/ProductCard';
import { getCategoryProducts } from 'src/services/ProductService';

const ProductList = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('cid');
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    setProduct([]);
    getCategoryProducts(search)
      .then((res) => {
        setProduct(res.data.Products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);

  return (
    <section className="products-page">
      <div className="container">
        {product.length !== 0 ? (
          <>
            <div className="products-content__intro"></div>
            <section className="products-content">
              <section className="products-list">
                {product.map((product) => (
                  <ProductCard key={product.Id} product={product} />
                ))}
              </section>
            </section>
          </>
        ) : (
          <>
            <div className="col">
              <Skeleton sx={{ height: 250 }} />
            </div>
            <div className="col">
              <Skeleton sx={{ height: 250 }} />
            </div>
            <div className="col">
              <Skeleton sx={{ height: 250 }} />
            </div>
            <div className="col">
              <Skeleton sx={{ height: 250 }} />
            </div>
            <div className="col">
              <Skeleton sx={{ height: 250 }} />
            </div>
            <div className="col">
              <Skeleton sx={{ height: 250 }} />
            </div>
            <div className="col">
              <Skeleton sx={{ height: 250 }} />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductList;
