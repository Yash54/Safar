import React from 'react';

const GeneralInstructions = () => {
    return (
        <div className="left-panel">
            <div className="general-instru">
                <hr className="hr-text" data-content="General Instructions" />
                <table className="instructions">
                    <thead>
                        <tr>
                            <th> Details About </th>
                            <th> Instructions </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> CHANGE IN PRICING PLAN:  </td>
                            <td> <ul> <li>The pricing plan (5 kms/hr, without fuel) cannot be changed after the booking is made </li> </ul></td>
                        </tr>
                        <tr>
                            <td> FUEL: </td>
                            <td> <ul> <li>In case you are returning the car at a lower fuel level than what was received, we will charge a flat Rs 500 refuelling service charge + actual fuel cost to get the tank to the same level as what was received.</li> </ul> </td>
                        </tr>
                        <tr>
                            <td> TOLLS, PARKING, INTER-STATE TAXES:  </td>
                            <td> <ul> <li>To be paid by you. </li> </ul></td>
                        </tr>
                        <tr>
                            <td> ID VERIFICATION:  </td>
                            <td> <ul> <li>Please keep your original Driving License handy. </li> <li>While delivering the car to you, our executive will verify your original Driving License and ID proof (same as the ones whose details were provided while making the booking). This verification is mandatory.</li><li> In the unfortunate case where you cannot show these documents, we will not be able to handover the car to you, and it will be treated as a late cancellation (100% of the fare would be payable).</li> <li> Driving license printed on A4. </li> <li> The pricing plan (5 kms/hr, without fuel) cannot be changed after the booking is madesheet of paper (original or otherwise) will not be considered as a valid document.</li> </ul> </td>
                        </tr>
                        <tr>
                            <td> PRE-HANDOVER INSPECTION: </td>
                            <td> <ul> <li>Please inspect the car (including the fuel gauge and odometer) thoroughly before approving the checklist.</li> </ul> </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default React.memo(GeneralInstructions);