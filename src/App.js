import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Menu from './components/Menu';
import Header from './components/Header';

function App() {
	return (
		<Router>
			<div className="app flex flex-col font-sans">
				<Header />
				<Routes>
					<Route path="/" element={ <Menu /> } />
				</Routes>
			</div>
		</Router>
	);
}

export default App;