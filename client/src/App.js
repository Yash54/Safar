import './App.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import Navbar from "./components/components/Navbar/Navbar";

function App() {
	return (
		<>
				<Router>
					<Navbar />
					<Switch>
						<Route path='/' exact render={() => <Home />} />
					</Switch>
				</Router>
		</>
	);
}

export default App;
