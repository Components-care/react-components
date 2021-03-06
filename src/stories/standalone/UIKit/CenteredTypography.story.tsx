import React from "react";
import { CenteredTypography } from "../../../standalone";

export const CenteredTypographyStory = (): React.ReactElement => {
	return (
		<div style={{ width: "90vw", height: "100vh" }}>
			<CenteredTypography variant={"h3"}>
				This text is centered relatively to its parent element
			</CenteredTypography>
		</div>
	);
};

CenteredTypographyStory.storyName = "CenteredTypography";
