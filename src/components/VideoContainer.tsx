import { VideoFormatted } from "./Search";

interface VideoContainer {
	item: VideoFormatted;
}

function VideoContainer({ item }: VideoContainer) {
	return (
		<>
			<div className="video-container" key={item.id}>
				<div className="video-thumbnail">
					<a href={`/video/${item.id}`}>
						<img src={item.thumbnail_img} alt={item.title} />
					</a>
				</div>
				<div className="video-info">
					<div className="video-title">
						<a href={`/video/${item.id}`}>
							{item.title}
						</a>
					</div>
					<div className="video-stats">
						<i className="fa fa-eye">
							<div className="video-views">
								{item.views.toLocaleString()} views
							</div>
						</i>
						<i className="fa fa-clock-o">
							<div className="video-duration">
								{item.duration}
							</div>
						</i>
						<i className="fa fa-calendar">
							<div className="video-uploaded">
								{item.uploadedAt}
							</div>
						</i>
					</div>
				</div>
			</div>
		</>
	);
}

export default VideoContainer;
