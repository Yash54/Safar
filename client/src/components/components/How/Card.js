import React from 'react';

function Card(props) {
    return (
        <>
            <div className={`demo-card demo-card--${props.step}`} data-aos={`fade-${props.aos}`} data-aos-duration="2400ms">
                <div className="head">
                    <div className="number-box">
                        <span>{props.number}</span>
                    </div>
                    <h2>
                        {props.heading}
                    </h2>
                </div>
                <div className="body">
                    <p>
                        {props.content}
                    </p>
                    <img src={props.src} alt="Graphic" className="diag-imgs"/>
                </div>
            </div>
        </>
    )
}

export default React.memo(Card);