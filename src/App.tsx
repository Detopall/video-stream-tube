import "./App.css";
import { Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import Hero from "./components/Hero";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import VideoSingle from "./components/VideoSingle";

function App() {
	const [toggleState, setToggleState] = useState(false);

	useEffect(() => {
		const darkMode = localStorage.getItem("darkMode");
		if (darkMode) {
			document.body.classList.add("dark-mode");
			setToggleState(true);
		} else {
			document.body.classList.remove("dark-mode");
			setToggleState(false);
		}
	}, []);

	function changeColor() {
		setToggleState(!toggleState);
		if (toggleState) {
			document.body.classList.remove("dark-mode");
			localStorage.removeItem("darkMode");
		} else {
			document.body.classList.add("dark-mode");
			localStorage.setItem("darkMode", "true");
		}
	}

	return (
		<>
			<button id="dark-light-button" onClick={changeColor}>
				<i className={toggleState ? "fa fa-sun-o" : "fa fa-moon-o"}></i>
			</button>
			<Header />
			<Routes>
				<Route path="/" element={<Hero />} />
				<Route
					path="/:searchQuery"
					element={<Search />}
				/>
				<Route path="/video/:videoId" element={<VideoSingle />} />
			</Routes>
		</>
	);
}

export default App;
