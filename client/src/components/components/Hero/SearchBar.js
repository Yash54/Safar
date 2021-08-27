import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export default function SearchBar(props) {
    
    const [from, setFrom] = React.useState(new Date().toString());
    const [to, setTo] = React.useState(new Date().toString());

    React.useEffect(() => {
        props.setTo(to);
        props.setFrom(from);
    }, [to, from]);

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div style={{ display: "flex", flexDirection: "column", width: "80%", margin: "auto" }}>
                <div className="selectDiv" style={{marginBottom:"7%"}}>
                    <select required className="dropdown-inputs" name="city" id="city-selection" style={{borderRadius:"10px"}} onChange={props.onChange}>
                        <option disabled selected>City</option>
                        <option value="Ahmedabad">Ahemadabad</option>
                        <option value="Gandhinagar">Gandhinagar</option>
                        <option value="Rajkot">Rajkot</option>
                        <option value="Surat">Surat</option>
                        <option value="Dahod">Dahod</option>
                    </select>
                </div>
                <KeyboardDatePicker
                    name="from"
                    margin="normal"
                    id="date-picker-dialog1"
                    label="From"
                    format="MM/dd/yyyy"
                    value={from}
                    minDate={new Date().toString()}
                    onChange={(date) => setFrom(date)}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <div style={{ width: "100%", margin: "8% auto 0.75% auto", textAlign: "center" }}><img src="\downarrow.png" width="5%" height="5%" alt="" /></div>

                <KeyboardDatePicker
                    name="to"
                    margin="normal"
                    id="date-picker-dialog2"
                    label="To"
                    format="MM/dd/yyyy"
                    value={to}
                    minDate={from}
                    onChange={(date) => setTo(date)}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </div>
        </MuiPickersUtilsProvider>
    );
}
