import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import YouTube from "react-youtube";
export default function Video() {
	const [showVideo, setShowVideo] = React.useState(false);
	const data = useStaticQuery(graphql`
		query {
			thumbnail: file(relativePath: { eq: "thumbnail.png" }) {
				childImageSharp {
					# Specify a fixed image and fragment.
					# The default width is 400 pixels
					fluid(maxWidth: 1200) {
						...GatsbyImageSharpFluid_withWebp
					}
				}
			}
		}
	`);
	return (
		<div className="relative w-full mx-auto rounded-lg shadow-lg lg:mx-4 xl:mx-8">
			{showVideo && (
				<div className="relative block w-full overflow-hidden bg-gray-300 rounded-lg min-h-32 lg:min-h-64 xl:min-h-80 focus:outline-none focus:ring">
					<YouTube
						className={""}
						opts={{
							width: "100%",
							playerVars: {
								start: 0,
								autoplay: 1,
								rel: 0,
							},
						}}
						videoId={"v29pdTZH7RE"}
					/>
				</div>
			)}
			{!showVideo && (
				<button
					onClick={() => setShowVideo(true)}
					type="button"
					className="relative block w-full overflow-hidden rounded-lg focus:outline-none focus:ring"
				>
					<Img
						className="w-full"
						fluid={data.thumbnail.childImageSharp.fluid}
						alt="We Are MVMUN"
					/>

					<div className="absolute inset-0 flex items-center justify-center w-full h-full">
						<svg
							className="w-20 h-20 text-indigo-500"
							fill="currentColor"
							viewBox="0 0 84 84"
						>
							<circle
								opacity="0.9"
								cx="42"
								cy="42"
								r="42"
								fill="white"
							/>
							<path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z" />
						</svg>
					</div>
				</button>
			)}
		</div>
	);
}
