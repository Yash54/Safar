import React, { useState } from 'react';
import { BoxContainer, FormContainer, SubmitButton, DisplayError } from '../../../styles/style';
import AuthService from "../../../services/auth";
import { useHistory } from 'react-router-dom';
import { CheckBox } from '../Checkbox/CheckBox';
import axios from 'axios';
import { authHeader } from "../../../services/authHeader";

const FareDetails = (props) => {

    const history = useHistory();

    const [first, setFirstState] = useState(false);
    const [second, setSecondState] = useState(false);

    const requestCar = (e) => {
        e.preventDefault();

        const payload = {
            carid: props.carid,
            lender_email: props.lender_email,
            from_date: props.fromDate,
            to_date: props.toDate,
            rent: props.rent,
        }

        console.log("--------------", payload);

        axios({
            method: "post",
            url: "/car/requestbooking",
            headers: authHeader(),
            data: payload
        }).then((res) => {
            console.log(res);
            if (res.status === 200) {
                history.push("/");
            }
        }).catch = (err) => {
            console.log(err);
        };

    }

    const firstCheckbox = (e) => {
        console.log(e.target.className);
        setFirstState(e.target.checked);
    }

    const secondCheckbox = (e) => {
        console.log(e.target.className);
        setSecondState(e.target.checked);
    }

    return (
        <div className="right-panel">
            <div className="charges">
                <hr className="hr-text" data-content="Fare Details" />
                <table className="fare">
                    <tbody>
                        <tr>
                            <td> <p style={{ float: "left" }}>Base Fare</p><p style={{ color: "red" }}>*</p> </td>
                            <td> <i className="fas fa-rupee-sign"> </i> {props.rent} </td>
                        </tr>

                        <tr>
                            <td> <p style={{ float: "left" }}>Penalty Charges</p><p style={{ color: "red" }}>*</p> </td>
                            <td> Same as Base Fare </td>
                        </tr>

                        <tr>
                            <td> <p style={{ float: "left" }}>Insurance & GST</p><p style={{ color: "red" }}>*</p> </td>
                            <td> Included </td>
                        </tr>

                        <tr>
                            <td> <p style={{ float: "left" }}>Refundable security deposit</p><p style={{ color: "red" }}>*</p> </td>
                            <td> <i className="fas fa-rupee-sign"> </i>{props.ref_deposit} </td>
                        </tr>
                    </tbody>
                </table>
                <p className="restriction" style={{ marginTop: "1%" }}><p style={{ color: "red", float: "left", marginRight: "1%" }}>*</p> These amount are based on the per day plan </p>
            </div>
            <BoxContainer >
                {
                    !(AuthService.getCurrentUser() && AuthService.getCurrentUser().accessToken)
                    &&
                    <DisplayError>Please First Login into the Site</DisplayError>
                }
                <FormContainer style={{ boxShadow: "0 0 0" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <CheckBox values={first} onChange={firstCheckbox} labelFor="The vehicle will be at your sole risk from the date and time of receiving the vehicle until the vehicle is returned to the user. You undertake to return the vehicle in the same condition that you received it, fair wear and tear excepted." className="T&C1" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <CheckBox values={second} onChange={secondCheckbox} className="T&C2" labelFor="You will return the vehicle, on the expiry or termination of this agreement, at your expense to the owner at the collection address recorded in the agreement. You acknowledge that failure to return the vehicle in terms of this agreement will constitute a breach of the agreement and illegal possession by you, and the owner may report the vehicle as stolen and/or repossess the vehicle wherever same may be found and from whomsoever is in possession thereof" />
                    </div>
                    <SubmitButton
                        style={{
                            padding: "3%",
                            opacity: (!first || !second || !(AuthService.getCurrentUser() && AuthService.getCurrentUser().accessToken)) ? 0.25 : 1
                        }}
                        onClick={(event) => requestCar(event)}
                        disabled={!first || !second || !(AuthService.getCurrentUser() && AuthService.getCurrentUser().accessToken)}
                    >
                        Request Car
                    </SubmitButton>
                </FormContainer>
            </BoxContainer>
        </div>
    )
}

export default React.memo(FareDetails);