import { useNavigate } from "react-router-dom";

export default function Header() {
	const navigate = useNavigate();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const searchQuery = (
			document.getElementById("search-query") as HTMLInputElement
		).value;

		if (!searchQuery) return;
		navigate(`/${searchQuery}`);
	}
	return (
		<div className="header">
			<div className="header-img">
				<a href="/">
					<img
						src="/src/assets/images/videostreamtube-logo.png"
						alt="VideoStreamTube"
					/>
				</a>
			</div>

			<div className="header-search-container">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Search"
						id="search-query"
						required
						autoComplete="off"
					/>
					<button type="submit">
						<i className="fa fa-search"></i>
					</button>
				</form>
			</div>
		</div>
	);
}
