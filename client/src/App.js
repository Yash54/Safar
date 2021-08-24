import './App.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import Navbar from "./components/components/Navbar/Navbar";
import { Authenticate } from "./components/pages/Auth/index.js";

function App() {
	return (
		<>
				<Router>
					<Navbar />
					<Switch>
						<Route path='/' exact render={() => <Home />} />
						<Route path='/user/signup' exact render={(props) => <Authenticate {...props} signup={true} />} />
						<Route path='/user/signin' exact render={() => <Authenticate />} />
					</Switch>
				</Router>
		</>
	);
}

export default App;
