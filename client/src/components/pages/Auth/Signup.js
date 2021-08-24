import React, { useContext,useEffect,useState,useRef } from "react";
import { Marginer } from "./marginer";
import {
    BoxContainer,
    FormContainer,
    Input,
    SubmitButton,
    DisplayError
} from "../../../styles/style";
import { AccountContext } from "./context";
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { GlobalState } from '../../context/index';

export function Signup(props) {

    const history = useHistory();

    const inputRef = useRef(null);

    const navLinkStyle = {
        color: 'rgba(170, 170, 170, 1)',
        fontSize: '2.5vh',
        fontWeight: '500',
        textDecoration: 'none',
    }

    const boldLink = {
        color: '#5963c3',
        fontWeight: '600',
        fontSize: '16px',
        textDecoration: 'none',
        margin: '0 3px',
    }

    const { switchToSignin } = useContext(AccountContext);
    const [user, dispatch] = useContext(GlobalState);

    const [userInfo, setUserInfo] = useState({
        fullName:"",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        address1: "",
        address2: "",
        city: "",
        pincode: "",
    });

    // error state
    const [errorState, setErrorState] = useState({
        error: false,
        statement: ""
    });
    
    const handleChange = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        if (e.target.name==="city")
            document.getElementById("city-selection").style.color="black";
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(userInfo);
    };

    const validateForm = () => {
        
        const passValidation = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
        var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        
        if (userInfo.fullName.length === 0)
        {
            setErrorState({
                error: true,
                statement: "Please Enter Your Full Name"
            })
            return false;
        }
        
        if (!(emailPattern.test(userInfo.email)))
        {
            setErrorState({
                error: true,
                statement: "Please Enter Proper Email-ID"
            })
            return false;
        }
        
        if (!(userInfo.password === userInfo.confirmPassword && passValidation.test(userInfo.password)))
        {
            setErrorState({
                error: true,
                statement:"Please Enter Password satisfying all the requirements"
            })
            return false;
        }

        if (userInfo.phoneNumber.length < 10) {
            setErrorState({
                error: true,
                statement: "Please Enter Correct Phone Number"
            })
            return false;
        }

        return true;
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm())
        {
            return;
        }
        else
        {
            sendToServer();
        }
    };

    const sendToServer = () => {
        const payload = {
            name:userInfo.fullName,
            email: userInfo.email,
            password: userInfo.password,
            phone_no: userInfo.phoneNumber,
            address: userInfo.address1 + "," + userInfo.address2,
            pincode: userInfo.pincode,
            city:userInfo.city,
        }

        axios.post("/user/create", payload).then((res) => {
            if (res.status === 200)
            {
                dispatch({
                    type: "TEMP_DETAILS",
                    payload: {
                        email: userInfo.email,
                        fullName: userInfo.fullName,
                        phoneNumber: userInfo.phoneNumber,
                        address: userInfo.address1 + "," + userInfo.address2,
                        city: userInfo.city,
                        pincode: userInfo.pincode,
                        password : userInfo.password,
                    }
                })
                // history.push({
                //     pathname: "/user/accountConfirmation",
                // });
                history.push("/")
            }
            else
            {
                setErrorState({
                    error: true,
                    statement: "Please try again to signup"
                })
                history.push("/user/signup")
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        inputRef.current.focus();
        document.title = "Create your account";
    }, [])

    return (
        <BoxContainer>
            <DisplayError>{errorState.error && errorState.statement}</DisplayError>
            <FormContainer>
                <Input ref={inputRef} placeholder="Full Name" onChange={ handleChange } name="fullName" required/>
                <Input type="email" placeholder="Email" onChange={handleChange} name="email" required/>
                <Input type="password" placeholder="Password with atleast one letter and one number" pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" onChange={handleChange} name="password" required/>
                <Input type="password" placeholder="Confirm Password" patter="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" onChange={handleChange} name="confirmPassword" required/>
                <Input type="tel" placeholder="0123456789" pattern="[0-9]{10}" maxlength="10" onChange={handleChange} name="phoneNumber" required />
                <Input placeholder="Address 1" onChange={handleChange} name="address1" required/>
                <Input placeholder="Address 2" onChange={handleChange} name="address2" required/>
                {/* <Input placeholder="City" onChange={handleChange} name="city" required/> */}
                <div className="selectDiv" style={{ marginBottom: "2%", marginTop:"2%"}}>
                    <select required className="dropdown-inputs" name="city" id="city-selection" style={{border:"1px solid #aaaaac", color:"#aaaaac"}} onChange={handleChange}>
                        <option disabled selected style={{color:"#aaaaac"}}>City</option>
                        <option value="Ahmedabad" style={{color:"#000"}}>Ahemadabad</option>
                        <option value="Vadodara" style={{color:"#000"}}>Vadodara</option>
                        <option value="Gandhinagar" style={{color:"#000"}}>Gandhinagar</option>
                        <option value="Rajkot" style={{color:"#000"}}>Rajkot</option>
                        <option value="Surat" style={{color:"#000"}}>Surat</option>
                        <option value="Dahod" style={{color:"#000"}}>Dahod</option>
                    </select>
                </div>
                <Input placeholder="Pincode" onChange={handleChange} name="pincode" required />
                <SubmitButton onClick={handleSubmit} >Signup</SubmitButton>
            </FormContainer>
            <Marginer direction="vertical" margin="1em" />
            <Marginer direction="vertical" margin={5} />
            <Link to="/user/signin" onClick={switchToSignin} style={navLinkStyle}>
                Already have an account?<span style={boldLink}>Log In</span>
            </Link>
        </BoxContainer>
    );
}