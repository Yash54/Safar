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
        line-height: 10.24;
    `;

export const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const history = useHistory();
    // error state
    const [errorState, setErrorState] = useState({
        error: false,
        statement: ""
    });

    const [user, dispatch] = useContext(GlobalState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmail((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (emailPattern.test(email.email) && email.email.length !== 0)
            sendToServer();
        else {
            setErrorState({
                error: true,
                statement: "Please Enter Valid Email ID"
            })
            history.push("/user/forgotPassword");
        }
    };

    const sendToServer = () => {
        const payload = {
            email: email.email,
        }

        axios.post("/user/resetpassmail", payload).then((res) => {
            if (res.status === 200) {
                dispatch({
                    type: "LOGIN_SUCESS",
                    payload: {
                        email: payload.email,
                    }
                });
                history.push({
                    pathname: "/user/confirmOTP",
                });
            } else {
                setErrorState({
                    error: true,
                    statement: "Something went wrong :( Please Try again"
                })
                history.push("/user/forgotPassword");
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <Container>
            <TopContainer>
                <BackDrop />
                <>
                    <SmallText>Enter Your Email</SmallText>
                </>
            </TopContainer>
            <BoxContainer>
                <DisplayError>{errorState.error && errorState.statement}</DisplayError>
                <FormContainer>
                    <Input type="email" placeholder="Email" onChange={handleChange} name="email" required />
                    <SubmitButton onClick={handleSubmit} >Send&nbsp;OTP</SubmitButton>
                </FormContainer>
            </BoxContainer>
        </Container>
    )
}
