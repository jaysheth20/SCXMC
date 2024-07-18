import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useI18n } from 'next-localization';

import { Product } from 'src/components/Product/Models/ProductInterface';
import ProductCard from 'src/components/Product/ProductCard';
import { useAppDispatch, useAppSelector } from 'src/store/StoreHook';
import { fetchWishlistData } from 'src/store/Wishlist';
import { getHomePageProducts } from 'src/services/HomePageService';

const HomeFeatureProduct = () => {
  const [slidesPerView, setSlidesPerView] = useState(2);
  const [centeredSlides, setCenteredSlides] = useState(false);
  const [spaceBetween, setSpaceBetween] = useState(30);
  const wishlist = useAppSelector((state) => state.wishlist);
  const dispatcher = useAppDispatch();
  const [product, setProduct] = useState<Product[]>([]);
  const { t } = useI18n();

  useEffect(() => {
    getHomePageProducts()
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    if (wishlist.Loading === true) {
      dispatcher(fetchWishlistData());
    }
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, [wishlist]);

  function updateWindowSize() {
    setSlidesPerView(1);
    setSpaceBetween(30);
    setCenteredSlides(true);

    if (window.innerWidth > 768) {
      setSlidesPerView(2);
      setSpaceBetween(40);
      setCenteredSlides(false);
    }
    if (window.innerWidth > 1024) {
      setSlidesPerView(3);
      setSpaceBetween(65);
      setCenteredSlides(false);
    }
  }

  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>{t('selected-just-for-you')}</h3>
        </header>
        {product.length !== 0 ? (
          <div className="products-carousel">
            <Swiper
              spaceBetween={spaceBetween}
              loop={true}
              centeredSlides={centeredSlides}
              watchOverflow={true}
              slidesPerView={slidesPerView}
              className="swiper-wrapper"
            >
              {product.map((product) => (
                <SwiperSlide key={product.Id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className={'row'}>
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
          </div>
        )}
      </div>
    </section>
  );
};
export default HomeFeatureProduct;
