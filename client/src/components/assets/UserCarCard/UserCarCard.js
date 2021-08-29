import React, {useState, useEffect, useRef} from "react";
import './UserCarCard.css';
import * as dayjs from 'dayjs';
import axios from 'axios';
import { authHeader } from "../../../services/authHeader";
import { GlobalState } from '../../context/index';
import { Icon, Avatar } from '@material-ui/core';
import Modal from 'react-awesome-modal';
import { FormContainer, SubmitButton, Input } from '../../../styles/style';
import { useHistory } from 'react-router-dom';
import AvatarEditor from 'react-avatar-editor';
import { cityz, colorz, fuel } from './../../components/LendACar/CarsData';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers';

const UserCarCard = ({ item, cardtype }) => {
    console.log(cardtype,item);

    const [user, dispatch] = React.useContext(GlobalState);
    const [openModal, setOpenModal] = useState(false);
    const setEditorRef = useRef();
    const history = useHistory();

    const [carInfo, setCarInfo] = useState({
        carid : "",
        registration_no : "",
        carModel : "",
        company : "",
        carImage : "",
        features : [],
        city: "",
        no_of_passengers : "",
        engine : "",
        fuel : "",
        rent : "",
        deposit : "",
        to_date : "",
        from_date : "",
    });

    const [carInfoUpdated, setCarInfoUpdated] = useState({
        carid : "",
        registration_no : "",
        carModel : "",
        company : "",
        carImage : "",
        features : [],
        city: "",
        no_of_passengers : "",
        engine : "",
        fuel : "",
        rent : "",
        deposit : "",
        to_date : "",
        from_date : "",
    });

    const [image, setImage] = useState("");
    const [croppedImage, setCroppedImage] = useState("");

    useEffect(() => {
        setCarInfo({
            carid : item.id,
            registration_no : item.registration_no,
            carModel : item.modl,
            company : item.company,
            carImage : item.pictures,
            features : item.features,
            city: item.city,
            no_of_passengers : item.no_of_passengers,
            engine : item.engine_type,
            fuel : item.fuel_type,
            deposit : item.deposite,
            color : item.color,
            from_date : item.from_date,
            to_date : item.to_date,
        })
        setCarInfoUpdated({
            carImage : item.pictures,
            features : item.features,
            city: item.city,
            fuel : item.fuel_type,
            deposit : item.deposite,
            color : item.color,
            from_date : item.from_date,
            to_date : item.to_date,
        })
        document.title = "Edit Car Details"
    }, [openModal])
    const updateCity = (e) => {
        setCarInfoUpdated({...carInfoUpdated, city:e.target.value});
        console.log("City updated!");
    }

    const updateColor = (e) => {
        setCarInfoUpdated({...carInfoUpdated, color:e.target.value});
        console.log("Color updated!");
    }

    const updateFuel = (e) => {
        setCarInfoUpdated({...carInfoUpdated, fuel:e.target.value});
        console.log("Fuel updated!");
    }

    const updateFrom = (str) => {
        setCarInfoUpdated({...carInfoUpdated, from_date:str});
    }

    const updateTo = (str) => {
        setCarInfoUpdated({...carInfoUpdated, to_date:str});
    }

    const handleOpen = () => setOpenModal(true);

    const hideModal = () => setOpenModal(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarInfoUpdated((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFile = event => {
        const file = event.target.files[0];
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.addEventListener("load", () => {
                setImage(reader.result);
                console.log(image);
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        var payload = {
            carid : carInfo.carid,
            city : (carInfoUpdated.city !== carInfo.city) ? carInfoUpdated.city : carInfo.city,
            carImage : (carInfoUpdated.carImage !== carInfo.carImage) ? carInfoUpdated.carImage : carInfo.carImage,
            rent : (carInfoUpdated.rent !== carInfo.rent) ? carInfoUpdated.rent : carInfo.rent,
            deposit : (carInfoUpdated.deposit !== carInfo.deposit) ? carInfoUpdated.deposit : carInfo.deposit,
            fuel : (carInfoUpdated.fuel !== carInfo.fuel) ? carInfoUpdated.fuel : carInfo.fuel,
            color : (carInfoUpdated.color !== carInfo.color) ? carInfoUpdated.color : carInfo.color,
            to_date : (carInfoUpdated.to_date !== carInfo.to_date) ? carInfoUpdated.to_date : carInfo.to_date,
            from_date : (carInfoUpdated.from_date !== carInfo.from_date) ? carInfoUpdated.from_date : carInfo.from_date,
            features : (carInfoUpdated.features !== carInfo.features) ? carInfoUpdated.features : carInfo.features,
        }
        console.log(payload);

        axios({
            method: "post",
            url: "/car/editcardetails",
            headers: authHeader(),
            data: payload
        }).then((res) => {
            console.log(res);
            if (res.status == 200) {
                history.push("/");
            }
        }).catch = (err) => {
            console.log(err);
        };
    };

    const deleteCar =() =>{
        console.log('Car Deleted Successfully');
    }


    const sendResponse = (status, bookingid, carid) => {
        
        const payload = {
            bookingid: bookingid,
            carid:carid,
        }
        console.log(payload);
        
        if (status === 1)
        {
            axios({
                method: 'post',
                url: "/car/acceptrequestbooking",
                headers: authHeader(),
                data: payload,
            })
            .then((res) => {
                if (res.status === 200) {
                    console.log(res);
                }
                
            }).catch((err) => {
                console.log(err);
                console.log("frontend");
            });
        }
        else if(status === 2)
        {
            axios({
                method: 'post',
                url: "/car/cancelrequestbooking",
                headers: authHeader(),
                data: payload,
            })
            .then((res) => {
                    if (res.status === 200) {
                        console.log(res);
                    }
                }).catch((err) => {
                    console.log(err);
                    console.log("frontend");
                });
        }
        else
        {
            axios({
                method: 'post',
                url: "/car/cancelconfirmedbooking",
                headers: authHeader(),
                data: payload,
            })
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res);
                    }
                }).catch((err) => {
                    console.log(err);
                    console.log("frontend");
                });
        }
    }
    let dayz = 0;
    if (cardtype !== "0")
    {
        const td = dayjs(item.booking_details ? item.booking_details.to_date : "", "YYYY-MM-DD");
        const fm = dayjs(item.booking_details ? item.booking_details.from_date : "", "YYYY-MM-DD");
        dayz = td.diff(fm, "day");
    }


    return (
        cardtype === "0" ? (
            // Added car card design
            <div className="user-car-card-2">
                <div className="left-user-car-card">
                    <div className="car-image-div">
                        <img src={item.pictures} className="car-image" alt="car" />
                    </div>
                </div>
                <div className="right-user-car-card">
                    <div className="car-generals">
                        <div className="seats">
                            <p> Seats</p>
                            <p className="value-x"> {item.no_of_passengers} </p>
                        </div>
                        <hr className="vertical" />
                        <div className="engine">
                            <p>  Engine</p>
                            <p className="value-x">{item.engine_type}</p>
                        </div>
                        <hr className="vertical" />
                        <div className="fuel">
                            <p>Fuel</p>
                            <p className="value-x">{item.fuel_type}</p>
                        </div>
                    </div>
                    <div className="car-name-details-2">
                        <div className="car-details">
                            <p> Car Name :</p>
                            <p className="value-x"> { " " + item.company + " " + item.modl} </p> 
                        </div><div className="car-details">
                            <p> Registration No. : </p>
                            <p className="value-x"> { " " + item.registration_no} </p>
                        </div>
                    </div>
                    <div className="button-list-2">
                        <button onClick={() => handleOpen()} style={{color : "#1d98cb", border : "1px solid #1d98cb"}} className="button-xyz">Edit</button>

                        <Modal visible={openModal} width="750" height="600" effect="fadeInUp" onClickAway={() => hideModal()}>
                            <div className="modal-container" >
                                <div className="modal-header" style={{ display: "flex", flexDirection: "row" }}>
                                    <h1 style={{ flexGrow: "1" }}>Edit Car Details</h1>
                                    <Icon className='far fa-times-circle' onClick={() => hideModal()} style={{cursor:"pointer"}}/>
                                </div>
                                <hr />
                                <div className="modal-content">
                                    <FormContainer>
                                        {image ? (
                                            <div style={{ width: "50%", margin: "5% 25%"}}>
                                            <AvatarEditor
                                                ref={setEditorRef}
                                                image={image}
                                                width={300}
                                                height={300}
                                                borderRadius={200}
                                                color={[0, 0, 0, 0.6]} // RGBA
                                                scale={1.2}
                                                rotate={0}
                                            /></div>
                                            ) : (
                                                <div style={{ width: "50%", margin: "5% 25%", borderRadius:"200px", border:"1px solid black" }}>
                                                    <img src={carInfo.carImage} alt={"user-profile"} className="profile-img" />
                                                </div>
                                        )
                                        }
                                        <Input
                                            onChange={handleFile}
                                            fluid
                                            type="file"
                                            label="New Avatar"
                                            name="previewImage"
                                        />
                                        <Input placeholder="Car Model" value={carInfo.carModel} name="carModel" required disabled/>
                                        <Input type="text" placeholder="Car Company" value={carInfo.company} name="carCompany" disabled />
                                        <Input type="text" placeholder="Registration No" value={carInfo.registration_no} name="reg_no" disabled />
                                        <Input type="text" placeholder="Engine Type" value={carInfo.engine} name="engine" disabled />
                                        <Input type="text" placeholder="Rent" value={carInfoUpdated.fuel} name="rent" onChange={handleChange} disabled />
                                        <Input type="text" placeholder="Deposit" value={carInfoUpdated.fuel} name="deposit" onChange={handleChange} disabled />
                                        
                                        <div className="selectDiv">
                                            <select required className="dropdown-inputs" id="color-selection" onChange={(e) => updateColor(e)} >
                                                <option value={carInfoUpdated.color} selected>{carInfoUpdated.color}</option>
                                                {colorz.map((opts) =>  {
                                                    if(opts!==carInfoUpdated.color)
                                                        return ( <option key={opts} >{opts}</option> )
                                                })}
                                            </select>
                                        </div>

                                        <div className="selectDiv">
                                            <select required className="dropdown-inputs" id="city-selection" onChange={(e) => updateCity(e)} >
                                                <option value={carInfoUpdated.city} selected>{carInfoUpdated.city}</option>
                                                {cityz.map((opts) => {
                                                    if(opts!==carInfoUpdated.city)
                                                        return ( <option key={opts} >{opts}</option> )
                                                })}
                                            </select>
                                        </div>

                                        <br />
                                        <div className="selectDiv">
                                            <select required className="dropdown-inputs" id="fuel-selection" onChange={e=>updateFuel(e)} >
                                                <option value={carInfoUpdated.fuel} selected>{carInfoUpdated.fuel}</option>
                                                {fuel.map((opts) =>  {
                                                    if(opts!==carInfoUpdated.fuel)
                                                        return ( <option key={opts} >{opts}</option> )
                                                })}
                                            </select>
                                        </div>
                                        <br />
                                        
                                        <div className="journeyRow">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog"
                                                label="From"
                                                format="MM/dd/yyyy"
                                                value={carInfoUpdated.from_date}
                                                minDate={new Date().toString()}
                                                onChange={(date) => updateFrom(date)}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />

                                        </MuiPickersUtilsProvider>

                                        <div style={{ width: "15%", margin: "8% auto 0.75% auto", textAlign: "center" }}>
                                            <img src='/doublearrowside.png' width="25" height="25" alt="arrow" />
                                        </div>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog"
                                                label="To"
                                                format="MM/dd/yyyy"
                                                value={carInfoUpdated.to_date}
                                                minDate={carInfoUpdated.from_date}
                                                onChange={(date) => updateTo(date)}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div> 
                                    <SubmitButton onClick={(e) => { handleSubmit(e); }} style={{ width:"40%", margin:"auto", padding:"2% 8%" }} > Edit Car Details </SubmitButton>
                                    </FormContainer>
                                </div>
                            </div>
                        </Modal>



                        <button style={{color : "red", border : "1px solid red"}} className="button-xyz" onClick={() => deleteCar()}>Delete</button>
                    </div>
                </div>
            </div>

        ) : (
            // Other car card design
            <div className="user-car-card">
                <div className="left-user-car-card">
                    <div className="car-image-div">
                        <img src={item.car_details ? item.car_details.pictures : ""} alt={"ajfbehjf"} className="user-car-image" />
                    </div>
                    <div style={{backgroundColor : "white"}}>
                    <div className="car-details">
                        <p> Car Name :</p>
                        <p className="value-x"> {item.car_details ?  " " + item.car_details.company + " " + item.car_details.modl : ""} </p> 
                    </div><div className="car-details">
                        <p> Registration No. : </p>
                        <p className="value-x"> {item.car_details ? " " + item.car_details.registration_no : ""} </p>
                    </div>
                    
                    <div className="car-details">
                        {cardtype !== "3" && cardtype !== "4" &&
                            (<>
                                <p> {"Deal starts from : " + (item.booking_details ? item.booking_details.from_date.split("T")[0] : "")} </p>
                                <p> {"Deal Ending : " + (item.booking_details ? item.booking_details.to_date.split("T")[0] : "")} </p>
                            </>)
                        }
                    </div>
                    </div>
                </div>
                {cardtype === "3" || cardtype === "4" ? (
                    <div className="right-user-car-card">
                        <div className="person-info">
                            {cardtype === "4" ? (
                                <div>
                                    <div className="car-details">
                                        <p> Lender Name :</p>
                                        <p className="value-x"> {item.lender_details ? " " + item.lender_details.name : ""} </p> 
                                    </div>
                                    
                                    <div className="car-details">
                                        <p> Lender City : </p>
                                        <p className="value-x"> {item.lender_details ? " " + item.lender_details.city : ""} </p> 
                                    </div>
                                    
                                    <div className="car-details">
                                        <p> Lender Contact : </p>
                                        <p className="value-x"> {item.lender_details ? " " + item.lender_details.phone_no : ""} </p> 
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="car-details">
                                        <p> Renter Name :</p>
                                        <p className="value-x"> {item.borrower_details ? " " + item.borrower_details.name : ""} </p> 
                                    </div>
                                    
                                    <div className="car-details">
                                        <p> Renter City : </p>
                                        <p className="value-x"> {item.borrower_details ? " " + item.borrower_details.city : ""} </p> 
                                    </div>
                                    
                                    <div className="car-details">
                                        <p> Renter Contact : </p>
                                        <p className="value-x"> {item.borrower_details ? " " + item.borrower_details.phone_no : ""} </p> 
                                    </div>
                                </div>
                            )
                            }
                        </div>
                        <div className="rent-info-req">
                            <div className="car-details">
                                <p> Deal starts from :</p>
                                <p className="value-x"> {item.booking_details ? " " + item.booking_details.from_date.split("T")[0] : ""} </p> 
                            </div>
                            
                            <div className="car-details">
                                <p> Deal Ending : </p>
                                <p className="value-x"> {item.booking_details ? " " + item.booking_details.to_date.split("T")[0] : ""} </p> 
                            </div>
                            
                            <div className="car-details">
                                <p> Rental Period : </p>
                                <p className="value-x"> { " " + dayz} </p> 
                            </div>

                            <div className="car-details">
                                <p> Rent per day : </p>
                                <p className="value-x"> {item.car_details ? " " + item.car_details.rent : ""} </p> 
                            </div>
                            
                            <div className="car-details">
                                <p> Rental Fare : </p>
                                <p className="value-x"> {item.booking_details ? " " + item.booking_details.rent : ""} </p> 
                            </div>
                        </div>
                        { // pending request , user = lender
                            cardtype === "3" && (item.booking_details ? item.booking_details.booking_status : -1) === -1 && (
                                <div className="car-requested">
                                    <p> Rent Requested </p>
                                    <div style={{display:"flex", flexDirection : "row", justifyContent:"space-evenly", marginTop:"2%"}}>
                                        <button className="button-xyz" style={{color : "#1d98cb", border : "1px solid #1d98cb"}} onClick={() => sendResponse(1, item.booking_details ? item.booking_details.bookingid : "", item.booking_details ? item.booking_details.carid : "")}> Accept </button>
                                        <button className="button-xyz" style={{color : "red", border : "1px solid red"}} onClick={() => sendResponse(-1, item.booking_details ? item.booking_details.bookingid : "", item.booking_details ? item.booking_details.carid : "")}> Decline </button>
                                    </div>
                                </div>
                                )}
                            
                            {cardtype === "3" && (item.booking_details ? item.booking_details.booking_status : -1) === 0 && (
                            <div className="car-requested">
                                <p> You have denied this request </p>
                            </div>
                            )}

                            {cardtype === "3" && (item.booking_details ? item.booking_details.booking_status : -1) === 1 && (
                                <div className="car-requested">
                                    <p> You have accepted this request </p>
                                </div>
                            )}

                        { // pending request , user = renter
                            cardtype === "4" && (item.booking_details ? item.booking_details.booking_status : -1) === -1 && (
                                <div className="req-response-wait">
                                    <p> The car rent request has been sent. Waiting for the lender to accept or deny. </p>
                                </div>
                            )}

                        { // rejected request , user = renter
                            cardtype === "4" && (item.booking_details ? item.booking_details.booking_status : -1) === 0 && (
                                <div className="req-response-rejected">
                                    <p> Sorry, the car rent request has been denied by the lender. Please try another car. </p>
                                </div>
                            )}

                        { // accepted request , user = renter
                            cardtype === "4" && (item.booking_details ? item.booking_details.booking_status : -1) === 1 && (
                                <div className="req-response-accepted">
                                    <p> The car rent request has been accepted by the lender. Enjoy your journey! </p>
                                </div>
                            )}
                    </div>
                ) : (
                    // card type lended cars and rented cars
                    <div className="right-user-car-card">
                        <div className="person-info">
                            {cardtype === "2" && (
                                <div>
                                    <div className="car-details">
                                        <p> Lender Name :</p>
                                        <p className="value-x"> {item.lender_details ? " " + item.lender_details.name : ""} </p> 
                                    </div>
                                    
                                    <div className="car-details">
                                        <p> Lender City : </p>
                                        <p className="value-x"> {item.lender_details ? " " + item.lender_details.city : ""} </p> 
                                    </div>
                                    
                                    <div className="car-details">
                                        <p> Lender Contact : </p>
                                        <p className="value-x"> {item.lender_details ? " " + item.lender_details.phone_no : ""} </p> 
                                    </div>
                                </div>)
                            }
                            {cardtype === "1" && (
                                <div>
                                    <div className="car-details">
                                        <p> Renter Name :</p>
                                        <p className="value-x"> {item.borrower_details ? " " + item.borrower_details.name : ""} </p> 
                                    </div>
                                    
                                    <div className="car-details">
                                        <p> Renter City : </p>
                                        <p className="value-x"> {item.borrower_details ? " " + item.borrower_details.city : ""} </p> 
                                    </div>
                                    
                                    <div className="car-details">
                                        <p> Renter Contact : </p>
                                        <p className="value-x"> {item.borrower_details ? " " + item.borrower_details.phone_no : ""} </p> 
                                    </div>
                                </div>)
                            }
                        </div>
                        <div className="rent-details">
                            <div className="car-details">
                                <p> Rental Period : </p>
                                <p className="value-x"> { " " + dayz} </p> 
                            </div>

                            <div className="car-details">
                                <p> Rent per day : </p>
                                <p className="value-x"> {item.car_details ? " " + item.car_details.rent : ""} </p> 
                            </div>
                            
                            <div className="car-details">
                                <p> Rental Fare : </p>
                                <p className="value-x"> {item.booking_details ? " " + item.booking_details.rent : ""} </p> 
                            </div>
                            <div className="car-details">
                                <p> Insurance and GST : </p>
                                <p className="value-x"> {" Inclusive"} </p> 
                            </div>
                            <div className="car-details">
                                <p> Final Payable amount :</p>
                                <p className="value-x"> {item.booking_details ? " " + item.booking_details.rent : ""} </p> 
                            </div>
                        </div>
                        <div className="rent-status-details">
                            <div className="rent-progress">
                                <p>Trip Status : </p>
                                {(item.booking_details ? item.booking_details.trip_status : 0) === 1 ? (<p style={{color : "green", borderBottom : "1px solid green", padding : "0.25em"}}>Completed</p>) : (
                                    (item.booking_details ? item.booking_details.trip_status : 0) === 0 ? (
                                        <p style={{color : "#1d98cb", borderBottom : "1px solid #1d98cb", padding : "0.25em"}}>On-Going</p>
                                    ) : (
                                        <p style={{color : "orange", borderBottom : "1px solid orange", padding : "0.25em"}}>Upcoming</p>
                                    ))}
                            </div>
                            {cardtype === "2" && (
                                <div style={{margin : "1em auto"}}>
                                {(item.booking_details ? item.booking_details.trip_status : 0) === 0 ? (
                                        <button style={{color : "#1d98cb", border : "1px solid #1d98cb"}} className="button-xyz"> Mark deal as completed </button>
                                        ) : (
                                        <button onClick={() => sendResponse(3, item.booking_details ? item.booking_details.bookingid : "", item.booking_details ? item.booking_details.carid : "")} style={{color : "red", border : "1px solid red"}} className="button-xyz"> Cancel the trip </button>
                                        )}
                                </div>)}
                        </div>
                    </div>
                )}
            </div>
        )
    );
};

export default React.memo(UserCarCard);