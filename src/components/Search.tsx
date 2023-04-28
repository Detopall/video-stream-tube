import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VideoContainer from "./VideoContainer";

export interface ApiFetch {
	method: string;
	headers: {
		"Content-Type": string;
		"X-RapidAPI-Host": string;
		"X-RapidAPI-Key": string;
	};
}

interface VideoFetched {
	thumbnail: {
		url: string;
	};
	title: string;
	duration_formatted: string;
	views: number;
	uploadedAt: string;
	id: string;
}

export interface VideoFormatted {
	thumbnail_img: string;
	title: string;
	duration: string;
	views: number;
	uploadedAt: string;
	id: string;
}

export default function Search() {
	const { searchQuery } = useParams();
	const [data, setData] = useState<VideoFormatted[]>([]);
	useEffect(() => {
		handleSearchQuery();
	});

	function addUrlEncoding(str: string) {
		return str.split(" ").join("20%");
	}

	async function createFetchOptions(
		searchQuery: string
	): Promise<{ url: string; options: ApiFetch }> {
		if (!searchQuery) throw new Error("No search query provided");

		const API_KEY = import.meta.env.VITE_API_KEY;
		const API_URL = import.meta.env.VITE_API_URL;

		const url = `https://${API_URL}/search?query=${addUrlEncoding(
			searchQuery
		)}&safesearch=true`;
		const options: ApiFetch = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"X-RapidAPI-Host": API_URL,
				"X-RapidAPI-Key": API_KEY,
			},
		};
		return { url, options };
	}

	function formatFetchedData(results: VideoFetched[]): VideoFormatted[] {
		const data: VideoFormatted[] = results.map((item: VideoFetched) => {
			return {
				thumbnail_img: item.thumbnail.url,
				title: item.title,
				duration: item.duration_formatted,
				views: item.views,
				uploadedAt: item.uploadedAt,
				id: item.id,
			};
		});
		return data;
	}

	async function handleSearchQuery() {
		if (!searchQuery) throw new Error("No search query provided");

		const { url, options } = await createFetchOptions(searchQuery);
		const fetched = await fetch(url, options);
		const response = await fetched.json();
		const formattedData = formatFetchedData(response.results);
		setData(formattedData);
	}

	return (
		<>
			<div className="video-search-container">
				{data.map((item: VideoFormatted) => {
					return <VideoContainer item={item} key={item.id}/>;
				})}
			</div>
		</>
	);
}


