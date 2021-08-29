import React, { useState, useRef, useEffect } from 'react';
import './Information.css';
import { GlobalState } from '../../../context/index';
import { Icon, Avatar } from '@material-ui/core';
import Modal from 'react-awesome-modal';
import { FormContainer, SubmitButton, Input } from '../../../../styles/style';
import { useHistory } from 'react-router-dom';
import AvatarEditor from 'react-avatar-editor';
import axios from 'axios';
import { authHeader } from "../../../../services/authHeader";
import { LocationCity, LocationOn, Email } from '@material-ui/icons';

export const Information = () => {
    const [user, dispatch] = React.useContext(GlobalState)
    const [open, setOpen] = useState(false);
    const inputRef = useRef(null);
    const setEditorRef = useRef();
    const history = useHistory();

    const [userInfo, setUserInfo] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        address: "",
        city: "",
        pincode: "",
    });

    const [userInfoUpdated, setUserInfoUpdated] = useState({
        updatedFullName: "",
        updatedPhoneNumber: "",
        updatedAddress1: "",
        updatedCity: "",
        updatedPincode: "",
    });

    const [image, setImage] = useState("");
    const [croppedImage, setCroppedImage] = useState("");

    useEffect(() => {
        setUserInfo({
            fullName: user.fullName,
            email: user.userEmail,
            phoneNumber: user.phoneNumber,
            address: user.address,
            city: user.city,
            pincode: user.pincode,
        })
        setUserInfoUpdated({
            updatedFullName: user.fullName,
            updatedPhoneNumber: user.phoneNumber,
            updatedAddress1: user.address,
            updatedCity: user.city,
            updatedPincode: user.pincode,
        })
        inputRef.current.focus()
        document.title = "Edit Details"
    }, [open])


    const handleOpen = () => setOpen(true);

    const hideModal = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfoUpdated((prevState) => ({
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
            fullName: user.fullName,
            email: user.userEmail,
            phoneNumber: user.phoneNumber,
            address: user.address,
            city: user.city,
            pincode: user.pincode,
        }

        if (userInfoUpdated.updatedFullName !== userInfo.fullName) {
            payload = {
                ...payload,
                fullName: userInfoUpdated.updatedFullName
            }
        }

        if (userInfoUpdated.updatedPhoneNumber !== userInfo.phoneNumber) {
            payload = {
                ...payload,
                phoneNumber: userInfoUpdated.updatedPhoneNumber
            }
        }

        if (userInfoUpdated.updatedCity !== userInfo.city) {
            payload = {
                ...payload,
                city: userInfoUpdated.updatedCity
            }
        }

        if ((userInfoUpdated.updatedAddress1) !== userInfo.address) {
            payload = {
                ...payload,
                address: (userInfoUpdated.updatedAddress1)
            }
        }

        if (userInfoUpdated.updatedPincode !== userInfo.pincode) {
            payload = {
                ...payload,
                pincode: userInfoUpdated.updatedPincode
            }
        }

        console.log(payload);

        axios({
            method: "post",
            url: "/user/updateprofile",
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

    return (
        <div id="info">
            <div style={{ width: "75%", margin: "5% 12.5%" }}>
                <img src="\acc.png"
                    alt={"hellow"} className="profile-img" />
            </div>
            <div className="fullName">
                <h1>{userInfo.fullName}</h1>
            </div>
            <button
                onClick={() => handleOpen()}
            >
                Edit Profile
            </button>

            <Modal visible={open} width="750" height="600" effect="fadeInUp" onClickAway={() => hideModal()}>
                <div className="modal-container" >
                    <div className="modal-header" style={{ display: "flex", flexDirection: "row" }}>
                        <h1 style={{ flexGrow: "1" }}>Edit Profile</h1>
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
                                        <img src="\acc.png" alt={"user-profile"} className="profile-img" />
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
                            <Input ref={inputRef} placeholder="Full Name" value={userInfoUpdated.updatedFullName} onChange={handleChange} name="updatedFullName" required />
                            <Input type="text" placeholder="Email" value={userInfo.email} name="email" disabled />
                            <Input type="tel" placeholder="0123456789" value={userInfoUpdated.updatedPhoneNumber} pattern="[0-9]{10}" maxlength="10" onChange={handleChange} name="updatedPhoneNumber" required />
                            <Input placeholder="Address 1" onChange={handleChange} name="updatedAddress1" />
                            <Input placeholder="City" value={userInfoUpdated.updatedCity} onChange={handleChange} name="updatedCity" />
                            <Input placeholder="Pincode" value={userInfoUpdated.updatedPincode} onChange={handleChange} name="updatedPincode" />
                            <span style={{ display: "flex", flexDirection:"row", width:"100%", marginTop:"5%"}}>
                                <SubmitButton onClick={(e) => { handleSubmit(e); }} style={{ width:"40%", margin:"0% 5%", padding:"2% 8%" }} > Edit Profile </SubmitButton>
                            </span>
                        </FormContainer>
                    </div>
                </div>
            </Modal>
            <div className="basic_details">
                <div className="address-details">
                    <LocationOn /><p style={{paddingLeft:"3%"}}>{userInfo.address}</p></div>
                <div className="location-details">
                    <LocationCity /><p style={{paddingLeft:"3%"}}>{userInfo.city}</p></div>
                <div className="email-details"> <Email /><p style={{paddingLeft:"3%"}}>{userInfo.email}</p></div>
            </div>
        </div>
    )
}
