import React from 'react'
import './AboutUsContent.css';

function AboutUsContent() {
    return (
        <div className="about-us-content">
            <div className="xyz dark-background">
                <div className="outer-border">
                    <div className="mid-border">
                        <div className="inner-border">
                            <img className="corner-decoration corner-left-top" src={"/borders/top-left.png"} alt="border"/>
                            <img className="corner-decoration corner-right-top" src={"/borders/top-left.png"} alt="border"/>
                            <img className="corner-decoration corner-right-bottom" src={"/borders/top-left.png"} alt="border"/>
                            <img className="corner-decoration corner-left-bottom" src={"/borders/top-left.png"} alt="border"/>
                            
                            <div className="container" style={{marginBottom:"5%"}}>
                                <div className="box-content">
                                    <div style={{width:"60%", margin:"0% 20% 3% 20%"}}><h1 className="montserrat h1-text">WAY MORE THAN A RENTAL CAR</h1></div>
                                    <div style={{width:"80%",margin:"0% 10% 3% 10%", textAlign:"center"}}>
                                        <h4 className="white-text countach" style={{marginBottom:"2%"}}>Safar is a peer-to-peer car sharing marketplace where you can book any car you want, wherever you want it, from a vibrant community of trusted hosts across India. Guests choose from a totally unique selection of nearby cars, while hosts earn extra cash to offset the costs of car ownership.</h4>
                                        <h4 className="white-text countach" style={{marginBottom:"2%"}}>Safar hopes to expand the sharing economy and the travel industry by building a safe, supportive community over huge crowd with more than thousands of vehicles listed.</h4>
                                        <h4 className="white-text countach">Whether it’s a rugged truck to help out on moving day, something smooth and buttery for a luxurious weekend away, or a vintage van for a picture-perfect road trip, Safar lets you find the perfect vehicle for your next adventure.</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(AboutUsContent);