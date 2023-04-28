import "./App.css";
import { Routes, Route } from "react-router-dom";
import VideoStreamTubeSearch from "./components/VideoStreamTubeSearch";
import Hero from "./components/Hero";
import VideoStreamTubeHeader from "./components/VideoStreamTubeHeader";
import { useEffect, useState } from "react";

function App() {
	const [toggleState, setToggleState] = useState(false);

	useEffect(() => {
		const darkMode = localStorage.getItem("darkMode");
		if (darkMode) {
			document.body.classList.add("dark-mode");
			setToggleState(true);
		}
		else {
			document.body.classList.remove("dark-mode");
			setToggleState(false);
		}
	}, []);


	function changeColor() {
		setToggleState(!toggleState);
		if (toggleState) {
			document.body.classList.remove("dark-mode");
			localStorage.removeItem("darkMode");
		}
		else {
			document.body.classList.add("dark-mode");
			localStorage.setItem("darkMode", "true");
		}
	}

	return (
		<>
		<button id="dark-light-button" onClick={changeColor}><i className={toggleState ? "fa fa-sun-o" : "fa fa-moon-o"}></i></button>
		<VideoStreamTubeHeader />
		<Routes>
			<Route path="/" element={<Hero />} />
			<Route path="/:searchQuery" element={<VideoStreamTubeSearch />} />
		</Routes>
		</>
	);
}

export default App;
