import React, { useState, useContext } from 'react';
import styled from "styled-components";
import { BoxContainer, FormContainer, Input, SubmitButton, DisplayError } from "../../../styles/style";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { GlobalState } from '../../context/index';

const Container = styled.div`
        margin-left:auto;
        margin-right:auto;
        margin-top : 8%;
        margin-bottom : 2%;
        width: 30%;
        transition : width 1s;
        @media (max-width : 900px){
            width:75%;
            transition : width 1s;
        }
        @media (max-width : 640px){
            width:94%;
            transition : width 0.5s;
        }
        min-height: 200px;
        height:90%;
        display: flex;
        flex-direction: column;
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);
        position: relative;
        overflow: hidden;
    `;

const TopContainer = styled.div`
        width: 100%;
        height: 250px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-end;
        padding: 0 2em;
        padding-bottom: 3.5em;
    `;

const BackDrop = styled.div`
        position: absolute;
        width: 65%;
        height: 250px;
        border-radius: 50%;
        transform: rotate(60deg);
        background: #151515;
    `;

const SmallText = styled.h5`
        font-weight: 500;
        color: #fff;
        z-index: 10;
        margin: 0;
        margin-left: 8%;
        font-size: 20px;
        line-height: 14.24;
    `;

export const ConfirmOTP = () => {

    const [otp, setOTP] = useState(0);
    const history = useHistory();
    // error state
    const [errorState, setErrorState] = useState({
        error: false,
        statement: ""
    });

    const [user, dispatch] = useContext(GlobalState);
    const email = user.userEmail;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOTP((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        sendToServer();
    };


    const sendToServer = () => {
        const payload = {
            otp: otp,
            email: email,
        }

        if (user.count === 3) {
            setErrorState({
                error: true,
                statement: "To Many Attemps Failed Please Try Again"
            });
            dispatch({
                type: "CLEAR_USER",
            });
            history.push("/user/forgotPassword");
        }
        else {

            axios.post("/user/verifyotp", payload).then((res) => {

                if (res.status === 200) {
                    history.push({
                        pathname: "/user/resetPassword",
                    });

                } else {
                    console.log(res)
                    setErrorState({
                        error: true,
                        statement: "Something went wrong :( Please Try again"
                    });
                    dispatch({
                        type: "OTP_FAILED",
                    });
                    history.push("/user/confirmOTP")
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    return (
        <Container>
            <TopContainer>
                <BackDrop />
                <>
                    <SmallText>Confirm Your OTP</SmallText>
                </>
            </TopContainer>
            <BoxContainer>
                <DisplayError>{errorState.error && errorState.statement}</DisplayError>
                <FormContainer>
                    <Input type="password" placeholder="Enter your OTP" name="otp" onChange={handleChange} required />
                    <SubmitButton onClick={handleSubmit} >Verify</SubmitButton>
                </FormContainer>
            </BoxContainer>
        </Container>
    )
}
