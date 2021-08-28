import React, { useState,useEffect } from "react";
import CarCard from "./CarCard";
import Modal from "react-awesome-modal";
import BookingDetails from "./BookingDetails";
import GeneralInstructions from "./GeneralInstructions";
import FareDetails from "./FareDetails";

const CardList = ({ list,toDate,fromDate }) => {

	const [visible, setVisible] = useState(false);
	const [car, setCar] = useState({
		carId: "",
		carName: "",
		seats: 5,
		rent: 0,
		penalty: 0,
		engine: "",
		fuel: "",
		features: [],
		picture: "",
		plan: "",
		lender_id: "",
		lender_name: "",
		lender_add: "",
		lender_phone: 1039289753,
		ref_deposit: 10000,
	})

	function openModal(item) {
		setVisible(true);
		console.log("items", item);
		setCar({
			carId: item.cardeatails ? item.cardeatails.carid : "",
			carName: (item.cardeatails ? item.cardeatails.company : "") + " " + (item.cardeatails ? item.cardeatails.modl : ""),
			seats: item.cardeatails ? item.cardeatails.no_of_passengers : "",
			rent: item.cardeatails ? item.cardeatails.rent : "",
			engine: item.cardeatails ? item.cardeatails.engine_type : "",
			fuel: item.cardeatails ? item.cardeatails.fuel_type : "",
			features: item.cardeatails ? item.cardeatails.features : "",
			picture: item.cardeatails ? item.cardeatails.pictures : "",
			ref_deposit: item.cardeatails ? item.cardeatails.deposite : "",
			lender_id: item.lenderdetails ? item.lenderdetails.email : "",
			lender_name: item.lenderdetails ? item.lenderdetails.name : "",
			lender_add: item.lenderdetails ? item.lenderdetails.city : "",
			lender_phone: item.lenderdetails ? item.lenderdetails.phone_no : "",
		});
	}

	function hideModal() {
		setVisible(false);
	}

	return (
		<div className="cars-div">
			<ul className="list">
				{list.map((item, index) => {
					return (<li className="car-card" onClick={() => openModal(item)} ><CarCard key={index} item={item} /></li>);
				})}
			</ul>
			<Modal visible={visible} effect="fadeInUp" width="95%" height="90%" onClickAway={() => hideModal()}>
				<div className="modal-div">
					<div className="close-div">
						<button onClick={() => hideModal()} className="close-btn"><img src="/close-button.png" className="image-design" alt="btn"/></button>
					</div>
					<div className="car-details-container">
						<BookingDetails
							carName={car.carName}
							picture={car.picture}
							seats={car.seats}
							engine={car.engine}
							fuel={car.fuel}
							modl={car.modl}
							lender_name={car.lender_name}
							lender_add={car.lender_add}
							lender_phone={car.lender_phone}
							toDate={toDate}
							fromDate={fromDate}
						/>

						<div className="info-container">
							<GeneralInstructions />
							<FareDetails
								rent={car.rent}
								ref_deposit={car.ref_deposit}
								lender_email={car.lender_id}
								carid={car.carId}
								fromDate={fromDate}
								toDate={toDate}
							/>
						</div>

					</div>
				</div>
			</Modal>
		</div>
	);
};

export default React.memo(CardList);