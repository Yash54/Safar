import React from 'react';
import { PhoneSharp, Schedule, LocationOn } from "@material-ui/icons";
import date from 'date-and-time';

const BookingDetails = (props) => {

    const pattern = date.compile("YYYY-MM-DD");
    var tod = date.format(new Date(props.toDate), pattern);
    var fromd = date.format(new Date(props.fromDate), pattern);

    return (
        <div className="car-profile-details-container">
            <hr className="hr-text" data-content="Car & Booking Details" />
            <br />
            <div className="car-profile-details">
                <div className="car-image-name-details">
                    <div className="car-image-name">
                        <h2>{props.carName}</h2>
                        <div>
                            <img src={props.picture} className="car-image" alt="Car"/>
                        </div>
                    </div>
                    <div className="car-generals">
                        <div className="seats">
                            <p> Seats</p>
                            <p> {props.seats} </p>
                        </div>
                        <hr className="vertical" />
                        <div className="engine">
                            <p>  Engine</p>
                            <p>{props.engine}</p>
                        </div>
                        <hr className="vertical" />
                        <div className="fuel">
                            <p>Fuel</p>
                            <p>{props.fuel}</p>
                        </div>
                    </div>
                </div>

                <div className="booking-details">
                    <div className="lender-details">
                        <div className="lender-name-profile" style={{ marginBottom: "2%" }}>
                            <img src='\account.png' alt={props.modl} className="lender-image" />
                            <p style={{ lineHeight: "40px", paddingTop: "auto", paddingBottom: "auto", marginLeft: "10%" }}> {props.lender_name} </p>
                        </div>
                        <div className="lender-address" style={{ marginBottom: "2%" }}>
                            <LocationOn fontSize="large" style={{ float: "left" }} />
                            <p style={{ lineHeight: "40px", paddingTop: "auto", paddingBottom: "auto", marginLeft: "10%" }}>{props.lender_add}</p>
                        </div>

                        <div className="lender-contact">
                            <PhoneSharp fontSize="large" style={{ float: "left" }} />
                            <p style={{ lineHeight: "40px", paddingTop: "auto", paddingBottom: "auto", marginLeft: "10%" }}> {props.lender_phone}</p>
                        </div>
                    </div>
                    <div className="journey-row">
                        <div className="journey-from"> <p>{fromd}</p> </div>
                        <div className="to-image">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30"><g fill="none"><g><g><g><g transform="translate(0 1)"><path stroke="#979797" d="M.5 15h40" stroke-linecap="square" /><circle cx="20" cy="16" r="13" fill="#9B9B9B" stroke="#F7F7F7" /><text fill="#fff" font-family="Helvetica" font-size="13" font-weight="bold"><tspan x="12" y="21">TO</tspan></text></g></g></g></g></g></svg>
                        </div>
                        <div className="journey-to"><p>{tod}</p></div>
                    </div>
                    <div className="journey-duration">
                        <Schedule style={{ float: "left" }} />
                        <p style={{ float: "left", marginLeft: "10px", textDecoration: "underline" }}> Journey duration </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(BookingDetails);