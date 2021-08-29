import React from "react";
import UserCarCard from "./UserCarCard";

const UserCarCardList = ({ list,cardtype }) => {

	return (
		<div className="user-cars-div">
			<ul className="user-car-list">
				{
					list.map((item, index) => {
						console.log(item);
						return (<li className="user-car-card-container"><UserCarCard cardtype={cardtype} key={index} item={item} /></li>);
					})
				}
			</ul>
		</div>
	);
};

export default React.memo(UserCarCardList);