import React, { useContext,useEffect,useState,useRef } from "react";
import {
    BoxContainer,
    FormContainer,
    Input,
    SubmitButton,
    DisplayError
} from "../../../styles/style";
import { AccountContext } from "./context";
import axios from 'axios';
import { Link,useHistory } from 'react-router-dom';
import { GlobalState } from '../../context/index';

export function Login(props) {

    const inputRef = useRef(null);
    const [user,dispatch] = useContext(GlobalState);
    const history = useHistory();

    const navLinkStyle = {
        color: 'rgba(170, 170, 170, 1)',
        fontSize: '15px',
        fontWeight: '500',
        margin: '0.5% 0%',
        textDecoration: 'none',
    }

    const boldLink = {
        color: '#5963c3',
        fontWeight: '600',
        fontSize: '16px',
        textDecoration: 'none',
        margin: '0 3px',
    }

    const { switchToSignup } = useContext(AccountContext);
    
    // user information
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });

    // error state
    const [errorState, setErrorState] = useState({
        error: false,
        statement:""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        // console.log(userInfo.email, userInfo.password);
    };

    const validateForm = () => {

        var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (!(emailPattern.test(userInfo.email))) {
            setErrorState({
                error: true,
                statement: "Please Enter Proper Email-ID"
            })
            return false;
        }

        if (userInfo.password.length < 8) {
            
            if (userInfo.password.length > 0)
            {
                setErrorState({
                    error: true,
                    statement: "Please Enter Password having atleast 8 characters and one letter",
                });
            }
            else
            {
                setErrorState({
                    error: true,
                    statement: "Please Enter Your Password",
                });
            }

            return false;
        }

        setErrorState({
            error: false,
            statement:""
        })
        return true;
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
        else {
            sendToServer();
        }
        
    };

    const sendToServer = () => {
        
        const payload = {
            email: userInfo.email,
            password: userInfo.password,
        };
        
        axios.post("/user/createsession", payload).then((res) => {
            if (res.status === 200) {
                localStorage.setItem("user", JSON.stringify(res.data));
                localStorage.setItem("UserEmail", JSON.stringify(userInfo.email));
                dispatch({
                    type: "LOGIN_SUCESS",
                    payload: {
                        email: userInfo.email,
                    }
                });
                history.push("/");
            }
            else {
                setErrorState({
                    error: true,
                    statement:"Please try again to signin"
                })
                history.push("/user/signin");
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        inputRef.current.focus();
        document.title = "Login into your account";
    },[])

    return (
        <BoxContainer>
            <DisplayError>{errorState.error && errorState.statement}</DisplayError>
            <FormContainer>
                <Input ref={inputRef} placeholder="Email" name="email" onChange={handleChange} required />
                <Input type="password" placeholder="Password" name="password" onChange={ handleChange } required/>
                <SubmitButton onClick={handleSubmit}>Login</SubmitButton>
            </FormContainer>
            <Link to="/user/forgotPassword" style={navLinkStyle}>Forgot Password?</Link>
            <Link to="/user/signup" style={navLinkStyle} onClick={switchToSignup}>
                Dont have an Account?<span style={boldLink}>Sign Up</span>
            </Link>
        </BoxContainer>
    );
}