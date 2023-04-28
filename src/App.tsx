import "./App.css";
import { Routes, Route } from "react-router-dom";
import VideoStreamTubeSearch from "./components/VideoStreamTubeSearch";
import Hero from "./components/Hero";
import VideoStreamTubeHeader from "./components/VideoStreamTubeHeader";
function App() {
	return (
		<>
		<VideoStreamTubeHeader />
		<Routes>
			<Route path="/" element={<Hero />} />
			<Route path="/:searchQuery" element={<VideoStreamTubeSearch />} />
		</Routes>
		</>
	);
}

export default App;
