import React,{useContext} from 'react';
import Filters from "../../components/Filters/Filters";
import CarDeck from "../../components/CardDeck/CardDeck";
import axios from 'axios';
import { authHeader } from "../../../services/authHeader";
import { GlobalState } from '../../context/index';

export const RentCar = () => {

    const [response, setResponse] = React.useState([]);
    const [city, setCity] = React.useState();
    const [toDate, setToDate] = React.useState();
    const [fromDate, setFromDate] = React.useState();
    const [user, dispatch] = useContext(GlobalState);
    var data;

    const loadData = (payload) => {
        console.log(payload);
        axios({
            method: 'post',
            url: "/car/filter",
            headers: authHeader(),
            data: payload,
        })
            .then((res) => {
                if (res.status === 200) {
                    data = res.data;
                    setResponse(data);
                }
                else {
                }
            }).catch((err) => {
                console.log(err);
            });
    }

    React.useEffect(() => {

        var payload = JSON.parse(localStorage.getItem("location"));
        setCity(payload.city);
        setToDate(payload.to);
        setFromDate(payload.from);

        axios({
            method: 'post',
            url: "/car/filter",
            headers: authHeader(),
            data: JSON.parse(localStorage.getItem("location")),
        })
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    data = res.data;
                    setResponse(res.data);
                }
                else {
                }
            }).catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <Filters
                toDate={toDate}
                fromDate={fromDate}
                city={city}
                fetchData={loadData}
            />
            {
                response
                &&
                <CarDeck
                    data={response}
                    city={city} 
                    toDate={toDate}
                    fromDate={fromDate}
                />
            }
        </div>
    )
}