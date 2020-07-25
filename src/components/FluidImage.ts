import { FluidObject } from "gatsby-image";

export default interface FluidImage {
	childImageSharp: {
		fluid: FluidObject;
	};
}
