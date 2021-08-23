import React from 'react';

function CardItem(props) {
  return (
    <>
      <li className='cards__item'>
        <div className="cards__item__rap" data-aos={props.daos} data-aos-duration={props.daosdur}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt=''
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
          </div>
        </div>
      </li>
    </>
  );
}

export default React.memo(CardItem);
