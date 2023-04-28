import { useParams } from "react-router-dom";
import { ApiFetch } from "./Search";
import { useEffect, useState } from "react";

interface SingleVideoFetched {
	uploadedAt: string;
	description: string;
	title: string;
	duration_formatted: string;
	views: number;
	channel: {
		name: string;
		icon: string;
	};
}

interface SingleVideoFormatted {
	uploadedAt: string;
	description: string;
	title: string;
	duration: string;
	views: number;
	channel_name: string;
	channel_icon: string;
}

export default function VideoSingle() {
	const { videoId } = useParams();
	const [videoData, setVideoData] = useState<SingleVideoFormatted>();
	useEffect(() => {
		const cachedVideoData = localStorage.getItem(`videoData-${videoId}`);
		if (cachedVideoData) {
			setVideoData(JSON.parse(cachedVideoData));
		} else {
			handleVideoQuery();
		}
	}, [videoId]);
	
	useEffect(() => {
		if (videoData) {
			localStorage.setItem(
				`videoData-${videoId}`,
				JSON.stringify(videoData)
			);
		}
	}, [videoData, videoId]);

	async function createFetchOptions(): Promise<{
		url: string;
		options: ApiFetch;
	}> {
		const API_KEY = import.meta.env.VITE_API_KEY;
		const API_URL = import.meta.env.VITE_API_URL;

		const url = `https://${API_URL}/video?search=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${videoId}`;

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

	async function handleVideoQuery() {
		const { url, options } = await createFetchOptions();
		const response = await fetch(url, options);
		const data = await response.json();
		const formattedData = formatFetchedData(data.result);
		if (!formattedData) throw new Error("No data provided");

		setVideoData(formattedData);
		localStorage.setItem(`video_${videoId}`, JSON.stringify(formattedData));
	}


	function formatFetchedData(
		result: SingleVideoFetched
	): SingleVideoFormatted {
		return {
			uploadedAt: result.uploadedAt,
			description: result.description,
			duration: result.duration_formatted,
			title: result.title,
			views: result.views,
			channel_name: result.channel.name,
			channel_icon: result.channel.icon,
		};
	}

	if (!videoData) return <h1>Loading...</h1>;

	return (
		<div className="video-single-container">
			<div className="video-single">
				<div className="video-single__video">
					<iframe
						width="560"
						height="315"
						src={`https://www.youtube.com/embed/${videoId}`}
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					></iframe>
				</div>
				<div className="video-single__info">
					<div className="video-single__info-title">
						<h1>{videoData.title}</h1>
					</div>
					<div className="video-single__info-views">
						<i className="fa fa-eye">
							<p>{videoData.views.toLocaleString()}</p>
						</i>
					</div>
					<div className="video-single__info-channel">
						<p>{videoData.channel_name}</p>
						<img src={videoData.channel_icon} />
					</div>
					<div className="video-single__info-description">
						<p>{videoData.description}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
