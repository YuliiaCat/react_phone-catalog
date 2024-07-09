import './HotPrices.scss';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Gadget } from '../../../types/Gadget';
import classNames from 'classnames';
import { getHotPrices } from '../../../services/getHotPrices';

export const HotPrices: React.FC = () => {
  const [suggestedProducts, setSuggestedProducts] = useState<Gadget[]>([]);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const fetchSuggestedProducts = async () => {
      const products = await getHotPrices();

      setSuggestedProducts(products);
    };

    fetchSuggestedProducts();
  }, []);

  const addToFav = () => {
    setIsPressed(!isPressed);
  };

  return (
    <div className="hotprices">
      <div className="newmodels__header">
        <h3 className="newmodels__header--title">Hot prices</h3>
        <div className="newmodels__header--buttons swiper-btn">
          <button className="swiper-btn__prev">
            <svg className="icon icon-nav">
              <use href="img/icons.svg#icon-arrow-left"></use>
            </svg>
          </button>
          <button className="swiper-btn__next">
            <svg className="icon icon-nav">
              <use href="img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
      <div className="newmodels__swiper">
        <Swiper
          spaceBetween={16}
          slidesPerView={1.5}
          modules={[Navigation]}
          breakpoints={{
            320: {
              slidesPerView: 1.4,
              spaceBetween: 16,
              loop: false,
            },

            450: {
              slidesPerView: 2,
              spaceBetween: 16,
              loop: false,
            },

            640: {
              slidesPerView: 2.5,
              spaceBetween: 16,
              loop: false,
            },

            800: {
              slidesPerView: 3,
              spaceBetween: 16,
              loop: false,
            },

            1000: {
              slidesPerView: 3.5,
              spaceBetween: 16,
              loop: false,
            },

            1200: {
              slidesPerView: 4,
              spaceBetween: 16,
              loop: false,
            },
          }}
          navigation={{
            nextEl: '.swiper-btn__next',
            prevEl: '.swiper-btn__prev',
          }}
          className="newmodels__list"
        >
          {suggestedProducts.map(product => (
            <SwiperSlide
              key={product.id}
              className="newmodels__list--card newmodels-card"
            >
              <div className="newmodels-card__picture">
                <img
                  className="newmodels-card__picture--img"
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <h4 className="newmodels-card__title">{product.name}</h4>
              <div className="newmodels-card__price">
                <p className="newmodels-card__price--disc">{`$${product.price}`}</p>
                <p className="newmodels-card__price--regular">
                  {`$${product.fullPrice}`}
                </p>
              </div>
              <ul className="newmodels-card__tech">
                <li className="newmodels-card__tech--item newmodels-item">
                  <p className="newmodels-item__name">Screen</p>
                  <p className="newmodels-item__param">{product.screen}</p>
                </li>
                <li className="newmodels-card__tech--item newmodels-item">
                  <p className="newmodels-item__name">Capacity</p>
                  <p className="newmodels-item__param">{product.capacity}</p>
                </li>
                <li className="newmodels-card__tech--item newmodels-item">
                  <p className="newmodels-item__name">RAM</p>
                  <p className="newmodels-item__param">{product.ram}</p>
                </li>
              </ul>
              <div className="newmodels-card__buttons">
                <button type="button" className="newmodels-card__buttons--add">
                  Add to cart
                </button>
                <button
                  className="newmodels-card__buttons--heart"
                  onClick={addToFav}
                >
                  <svg
                    className={classNames('icon icon-heart', {
                      'icon-heart-red': isPressed,
                    })}
                  >
                    <use href="img/icons.svg#icon-favourites-filled"></use>
                  </svg>
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
