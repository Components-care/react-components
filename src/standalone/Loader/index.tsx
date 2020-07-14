import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Typography } from "@material-ui/core";

export interface ILoaderProps {
	/**
	 * Optional status message to show
	 */
	text?: string;
}

const useStyles = makeStyles({
	innerProgressWrapper: {
		left: "50%",
		position: "absolute",
		top: "50%",
		transform: "translate(-50%, -50%)",
	},
	innerWrapper: {
		height: 70,
		left: "50%",
		position: "absolute",
		textAlign: "center",
		top: "50%",
		transform: "translate(-50%, -50%)",
		width: "100%",
	},
	outerProgressWrapper: {
		height: "100%",
		position: "relative",
		width: "100%",
	},
	outerWrapper: {
		height: "100%",
		position: "relative",
		width: "100%",
	},
});

export default (props: ILoaderProps) => {
	const classes = useStyles();

	return (
		<div className={classes.outerWrapper}>
			<div className={classes.innerWrapper}>
				{props.text && <Typography variant={"h6"}>{props.text}</Typography>}
				<div className={classes.outerProgressWrapper}>
					<div className={classes.innerProgressWrapper}>
						<CircularProgress />
					</div>
				</div>
			</div>
		</div>
	);
};