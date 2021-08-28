import React from 'react';
import "./Filters.css";
import { CheckBox } from "./../../assets/Checkbox/CheckBox";
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

class Filters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            to: this.props.toDate,
            from: this.props.fromDate,
            city:this.props.city,
            categories: [],
            brand: [],
            fuel: [],
            eng: [],
            seats: [],
            color: [],
            email: JSON.parse(localStorage.getItem("UserEmail")) ? JSON.parse(localStorage.getItem("UserEmail")) : "",
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.toDate !== state.to) {
            return {
                to: props.toDate,
                from: props.fromDate,
                city: props.city,
            };
        }
        return null;
    }

    setFilters = () => {

        if (!this.debouncedFn) {
            this.debouncedFn = _.debounce(() => {
                this.props.fetchData(this.state);
            }, 1000);
        }
        this.debouncedFn();
    }


    eventHandler = (e) => {

        if (e.target.className === "categories") {
            if (e.target.checked) {
                this.setState({
                    categories: [...this.state.categories, e.target.name]
                }, () => this.setFilters());
            }
            else
            {
                let cat = this.state.categories.filter(item => item !== e.target.name);
                this.setState({
                    categories: [...cat]
                }, () => this.setFilters());
            }
        }
        else if (e.target.className === "brand") {
            if (e.target.checked) {
                this.setState({
                    brand: [...this.state.brand, e.target.name]
                }, () => this.setFilters());
            }
            else {
                let cat = this.state.brand.filter(item => item !== e.target.name);
                this.setState({
                    brand: [...cat]
                }, () => this.setFilters());
            }
        }
        else if (e.target.className === "fuel") {
            if (e.target.checked) {
                this.setState({
                    fuel: [...this.state.fuel, e.target.name]
                }, () => this.setFilters());
            }
            else {
                let cat = this.state.fuel.filter(item => item !== e.target.name);
                this.setState({
                    fuel: [...cat]
                }, () => this.setFilters());
            }
        }
        else if (e.target.className === "eng") {
            if (e.target.checked) {
                this.setState({
                    eng: [...this.state.eng, e.target.name]
                }, () => this.setFilters());
            }
            else {
                let cat = this.state.eng.filter(item => item !== e.target.name);
                this.setState({
                    eng: [...cat]
                }, () => this.setFilters());
            }
        }
        else if (e.target.className === "seats") {
            if (e.target.checked) {
                this.setState({
                    seats: [...this.state.seats, e.target.name]
                }, () => this.setFilters());
            }
            else {
                let cat = this.state.seats.filter(item => item !== e.target.name);
                this.setState({
                    seats: [...cat]
                }, () => this.setFilters());
            }
        }
        else if (e.target.className === "color") {
            if (e.target.checked) {
                this.setState({
                    color: [...this.state.color, e.target.name]
                }, () => this.setFilters());
            }
            else {
                let cat = this.state.color.filter(item => item !== e.target.name);
                this.setState({
                    color: [...cat]
                }, () => this.setFilters());
            }
        }

    };

    render() {
        return (
            <div className="filters">
                <hr className="hr-text2" data-content="Filters" />

                <div className="categories-filter">
                    <h3>Categories</h3>
                    <CheckBox labelFor="Hatchback" className="categories" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="Sedan" className="categories" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="SUV" className="categories" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="MUV" className="categories" onChange={this.eventHandler} values={false} />
                </div>


                <div className="brand-filter">
                    <h3>Brand</h3>
                    <CheckBox labelFor="Hyundai" className="brand" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="Maruti Suzuki" className="brand" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="Mahindra" className="brand" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="Jeep" className="brand" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="Kia" className="brand" onChange={this.eventHandler} values={false} />
                </div>

                <div className="fuel-filter">

                    <h3>Fuel Type</h3>
                    <CheckBox labelFor="Diesel" className="fuel" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="Petrol" className="fuel" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="Diesel + CNG" className="fuel" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="Petrol + CNG" className="fuel" onChange={this.eventHandler} values={false} />
                </div>

                <div className="engine-filter">

                    <h3>Transmission Type</h3>
                    <CheckBox labelFor="Manual" className="eng" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="Auto" className="eng" onChange={this.eventHandler} values={false} />
                </div>

                <div className="seats-filter">

                    <h3>Seating Capacity</h3>
                    <CheckBox labelFor="5 seater" className="seats" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="7 seater" className="seats" onChange={this.eventHandler} values={false} />

                </div>


                <div className="color-filter">

                    <h3>Colors</h3>
                    <CheckBox labelFor="Crimson Red" className="color" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="Silver" className="color" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="White" className="color" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="Yellow" className="color" onChange={this.eventHandler} values={false} />
                    <CheckBox labelFor="Black" className="color" onChange={this.eventHandler} values={false} />

                </div>

            </div>
        )
    }
}

export default withRouter(Filters);