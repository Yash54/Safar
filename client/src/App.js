import './App.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import Navbar from "./components/components/Navbar/Navbar";
import { Authenticate } from "./components/pages/Auth/index.js";
import { RentCar } from "./components/pages/RentCar/RentCar";
import LendCar from './components/components/LendACar/LendCar';

function App() {
    return (
        <>
                <Router>
                    <Navbar />
                    <Switch>
                        <Route path='/' exact render={() => <Home />} />
                        <Route path='/user/signup' exact render={(props) => <Authenticate {...props} signup={true} />} />
                        <Route path='/user/signin' exact render={() => <Authenticate />} />
                        <Route path='/rent' exact render={() => <RentCar />} />
                        <Route path='/user/lendCar' exact render={() => <LendCar />} />
                    </Switch>
                </Router>
        </>
    );
}

export default App;