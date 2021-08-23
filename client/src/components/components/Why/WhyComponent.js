import React from 'react';
import './WhyComponent.css';
import CardItem from '../../assets/Card Item/CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1 className='cards__header'>Why Us!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='https://travelntips.com/wp-content/uploads/2018/06/long-drive.jpg'
              text='Drive as much as you want with unlimited kms. Just like your own car!'
              label='No Limits'
              path='/services'
              daos='fade-right'
              daosdur='3000ms'
            />
            <CardItem
              src='https://www.hyundai.com/content/hyundai/ww/data/news/data/2021/0000016609/image/newsroom-0112-photo-1-2021elantranline-1120x745.jpg'
              text='Enjoy complete peace of mind with your liability limited to Rs. 10000. In case of any unfortunate incident, our insurance cover will take care of the rest!'
              label='Limited Liability'
              path='/services'
              daos="zoom-in"
              daosdur="3000ms"
            />
            <CardItem
              src='https://www.autoguide.com/blog/wp-content/uploads/2020/05/best-car-detailing-products-1280x720.jpg'
              text='The enhanced cleaning policy requires hosts to clean & disinfect their cars so you can feel good behind the wheel.'
              label='Clean & disinfected cars'
              path='/services'
              daos="fade-left"
              daosdur="3000ms"
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='https://www.web2carz.com/images/articles/201808/car_purchase_handshake_1535401739_600x275.jpg'
              text='Get free door to door delivery and pickup.'
              label='Doorstep Car Delivery'
              path='/services'
              daos='fade-right'
              daosdur='3000ms'
            />
            <CardItem
              src='https://akm-img-a-in.tosshub.com/businesstoday/images/story/202002/car_insurance_660_052217055313_100220073933.jpg?size=1200:675'
              text='All your bookings include damage insurance! drive safe, but don’t worry!'
              label='Include Damage Insurance'
              path='/products'
              daos="zoom-out"
              daosdur="3000ms"
            />
            <CardItem
              src='https://images.unsplash.com/photo-1510227320292-0811fae44991?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
              text='Go anywhere. our cars have all INDIA permits. Just remember to pay state tolls and taxes.'
              label='All India Permit'
              path='/sign-up'
              daos="fade-left"
              daosdur="3000ms"
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='https://ddi-dev.com/uploads/booking-software.jpg'
              text='Easy and Transparent Procedure!'
              label='Booking in 2 Minutes'
              path='/services'
              daos='fade-right'
              daosdur='3000ms'
            />
            <CardItem
              src='https://www.sciencenewsforstudents.org/wp-content/uploads/2019/11/860_main_fossil_fuels_explainer.png'
              text='You pay for only as much fuel as you use!'
              label='0 Hidden Charges'
              path='/products'
              daos="zoom-out"
              daosdur="3000ms"
            />
            <CardItem
              src='https://www.airbnbtips.com/wp-content/uploads/2019/07/airbnb-cancellation-policy.jpg'
              text='Cancel for free up to 24 hours before your trip starts. Plans can change and it helps to be flexible when they do.'
              label='Flexible cancellations'
              path='/sign-up'
              daos="fade-left"
              daosdur="3000ms"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Cards);
