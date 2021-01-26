import React, { CSSProperties, useCallback, useState } from "react";
import {
	Grid,
	GridProps,
	IconButton,
	IconButtonProps,
} from "@material-ui/core";
import { DoubleArrow } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { usePortalLayoutContext } from "./Layout";

export interface CollapsibleMenuProps {
	/**
	 * The actual menu (Menu/RoutedMenu)
	 */
	children: React.ReactNode;
	/**
	 * Custom styles for some child components
	 */
	customClasses?: {
		root?: GridProps["className"];
		button?: IconButtonProps["className"];
	};
	/**
	 * Width of the menu (excluding collapse area)
	 */
	width?: CSSProperties["width"];
	/**
	 * Custom styles (for collapse)
	 */
	classes?: Partial<ReturnType<typeof useStyles>>;
}

const useStyles = makeStyles({
	container: {
		width: "100%",
		height: "100%",
	},
	iconOpen: {},
	iconClose: {
		transform: "rotate(180deg)",
	},
});

const CollapsibleMenu = (props: CollapsibleMenuProps) => {
	const classes = useStyles(props);
	const [collapsed, setCollapsed] = useState(false);
	const { mobile } = usePortalLayoutContext();

	const toggleCollapsed = useCallback(() => setCollapsed((prev) => !prev), [
		setCollapsed,
	]);

	return (
		<Grid
			container
			justify={"flex-start"}
			alignItems={"stretch"}
			wrap={"nowrap"}
			className={`${classes.container} ${props.customClasses?.root ?? ""}`}
		>
			{!collapsed && (
				<Grid item xs style={{ width: props.width }} key={"content"}>
					{props.children}
				</Grid>
			)}
			{!mobile && (
				<Grid item key={"bar"}>
					<IconButton
						onClick={toggleCollapsed}
						className={props.customClasses?.button}
					>
						<DoubleArrow
							className={collapsed ? classes.iconOpen : classes.iconClose}
						/>
					</IconButton>
				</Grid>
			)}
		</Grid>
	);
};

export default React.memo(CollapsibleMenu);