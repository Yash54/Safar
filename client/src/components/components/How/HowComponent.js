import React from 'react';
import Card from './Card';
import './HowComponent.css';

function HowComponent() {
    return (
        <div className="timeline" id="timeline">
            <h1> How it Works </h1>
            <div className="demo-card-wrapper">
                
                <Card
                    step="step1"
                    aos="right"
                    number="01"
                    heading="Explore &amp; Request"
                    content="Explore the website &amp; Request for the car you like"
                    src="https://media.wired.com/photos/5d09594a62bcb0c9752779d9/16:9/w_2000,h_1125,c_limit/Transpo_G70_TA-518126.jpg"
                />

                <Card
                    step="step2"
                    aos="left"
                    number="02"
                    heading="Deal &amp; Book"
                    content="Contact the Lender, Deal a contract with him and Book the car"
                    src="https://besthqwallpapers.com/Uploads/20-10-2019/108733/thumb2-business-handshake-businessmen-shaking-hands-business-concepts-handshake-deal-concepts.jpg"
                />

                <Card
                    step="step3"
                    aos="right"
                    number="03"
                    heading="Pay &amp; Take-Away"
                    content="Take the Rented Car from the lender's location after Paying the safe deposits"
                    src="https://thumbs.dreamstime.com/b/purchase-deal-buy-rent-new-car-hand-dollar-money-car-keys-finance-purchase-deal-buy-rent-new-car-hand-208303113.jpg"
                />

                <Card
                    step="step4"
                    aos="left"
                    number="04"
                    heading="Drive"
                    content="Enjoy your ride in the luxurious car"
                    src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fyc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                />

                <Card
                    step="step5"
                    aos="right"
                    number="05"
                    heading="Return"
                    content="Return Back the car at the Lender's preferred location"
                    src="https://intloveincorporated.blob.core.windows.net/contentimages/main/car-key.jpg"
                />

            </div>
        </div>
    );
}

export default React.memo(HowComponent);
