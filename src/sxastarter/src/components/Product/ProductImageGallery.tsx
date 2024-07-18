import React, { useEffect } from 'react';

import { DefaultPictureModel } from 'src/components/Product/Models/ProductDetailType';
import { PictureModels } from 'src/components/Product/Models/ProductInterface';

interface ProductImageGalleryProps {
  images: PictureModels[];
  defaultPicture: DefaultPictureModel;
}

const ProductImageGallery = (props: ProductImageGalleryProps) => {
  const { images, defaultPicture } = props;
  const [defaultSrc, setSrc] = React.useState('');

  useEffect(() => {
    handleSrc(defaultPicture.FullSizeImageUrl);
  }, [defaultPicture]);

  const handleSrc = (src: string) => {
    setSrc(src);
  };

  return (
    <>
      <section className="product-gallery">
        <div className="product-gallery__thumbs">
          {images.map((item, index) => (
            <div key={index} className="product-gallery__thumb">
              <img
                onClick={() => setSrc(item.FullSizeImageUrl)}
                src={item.ThumbImageUrl}
                alt={item.AlternateText}
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <div className="product-gallery__image">
          <img src={defaultSrc} alt="" />
        </div>
      </section>
    </>
  );
};

export default ProductImageGallery;
