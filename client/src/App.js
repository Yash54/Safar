import './App.css';
import { useReducer, } from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import Navbar from "./components/components/Navbar/Navbar";
import { Authenticate } from "./components/pages/Auth/index.js";
import { RentCar } from "./components/pages/RentCar/RentCar";
import { Profile } from './components/pages/Profile/Profile';
import LendCar from './components/components/LendACar/LendCar';


import { userReducer, initialUserState } from './components/reducer';
import { GlobalState } from './components/context';


import AOS from 'aos';
import "aos/dist/aos.css";
AOS.init();

function App() {

	const [user, dispatch] = useReducer(userReducer, initialUserState);

    return (
        <>
		<GlobalState.Provider value={[user, dispatch]}>
                <Router>
                    <Navbar />
                    <Switch>
                        <Route path='/' exact render={() => <Home />} />
                        <Route path='/user/signup' exact render={(props) => <Authenticate {...props} signup={true} />} />
                        <Route path='/user/signin' exact render={() => <Authenticate />} />
                        <Route path='/rent' exact render={() => <RentCar />} />
						<Route path='/user/profile' exact render={() => <Profile />} />
                        <Route path='/user/lendCar' exact render={() => <LendCar />} />
                    </Switch>
                </Router>
		</GlobalState.Provider>
        </>
    );
}

export default App;