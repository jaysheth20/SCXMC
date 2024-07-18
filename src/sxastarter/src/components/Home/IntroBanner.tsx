import React from 'react';
import { Field, ImageFieldValue, LinkFieldValue } from '@sitecore-jss/sitecore-jss-nextjs';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Navigation } from 'swiper';
import Link from 'next/link';

import { ComponentProps } from 'lib/component-props';

SwiperCore.use([EffectFade, Navigation]);
type ShopOffer = {
  fields: {
    IconCss: Field<string>;
    Title: Field<string>;
    SubTitle: Field<string>;
  };
};

type IntroSlides = {
  fields: {
    Heading: Field<string>;
    Link: Field<LinkFieldValue>;
    Image: Field<ImageFieldValue>;
  };
};

type IntroBannerProp = ComponentProps & {
  fields: {
    IntroSlides: IntroSlides[];
    ShopOffer: ShopOffer[];
  };
};

const IntroBanner = (props: IntroBannerProp) => {
  const fields = props.fields;

  return (
    <section className="page-intro">
      <Swiper navigation effect="fade" className="swiper-wrapper">
        {fields.IntroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="page-intro__slide"
              style={{ backgroundImage: 'url(' + slide.fields.Image.value.src + ')' }}
            >
              <div className="container">
                <div className="page-intro__slide__content">
                  <h2>{slide.fields.Heading.value}</h2>
                  <Link href={slide.fields.Link.value.href || '/'} className="btn-shop">
                    <i className="icon-right"></i>Shop now
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="shop-data">
        <div className="container">
          <ul className="shop-data__items">
            {fields.ShopOffer.map((slide, index) => (
              <li key={index}>
                <i className={slide.fields.IconCss.value}></i>
                <div className="data-item__content">
                  <h4>{slide.fields.Title.value}</h4>
                  <p>{slide.fields.SubTitle.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default IntroBanner;
