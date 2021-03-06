import React from "react";
import { List, makeStyles } from "@material-ui/core";
import "../../../i18n";
import {
	JumboReactDarkMenuItem,
	JumboReactLightMenuItem,
	MaterialMenuItem,
	PortalLayout,
} from "../../../standalone/Portal";
import { Domain, Home } from "@material-ui/icons";
import { button, select } from "@storybook/addon-knobs";
import { FrameworkHistory, RoutedMenu } from "../../..";

const useStyles = makeStyles(
	{
		header: {
			width: "100%",
			height: "100%",
			backgroundColor: "red",
		},
		content: {
			width: "100%",
			height: "100%",
			backgroundColor: "green",
		},
		topLeft: {
			width: "100%",
			height: "100%",
			backgroundColor: "yellow",
		},
	},
	{ name: "CcPortalMenuStory" }
);

const usePortalStyles = makeStyles(
	{
		menuWrapper: {
			backgroundColor: "#252525",
		},
		menuChildrenWrapper: {
			backgroundColor: "#1d1d1d",
		},
	},
	{ name: "CcPortalMenuStyleStory" }
);

interface IPlaceHolderProps {
	cssClass: "header" | "content" | "topLeft";
}

const Placeholder = (props: IPlaceHolderProps) => {
	const { cssClass } = props;
	const classes = useStyles();
	return <div className={classes[cssClass]}>{cssClass}</div>;
};

export const PortalMenuStory = (): React.ReactElement => {
	const variant = select(
		"Variant",
		{
			Material: "Material",
			JumboLight: "JumboLight",
			JumboDark: "JumboDark",
		},
		"JumboDark"
	);

	const classes = usePortalStyles();

	button("Navigate to Home (/)", () => FrameworkHistory.push("/"));
	button("Navigate to Admin Item 1 (/admin/1)", () =>
		FrameworkHistory.push("/admin/1")
	);
	button("Navigate to Admin Item 2 (/admin/2)", () =>
		FrameworkHistory.push("/admin/2")
	);
	button("Navigate to Admin Item 3 (/admin/3)", () =>
		FrameworkHistory.push("/admin/3")
	);
	button("Navigate to Admin Item 4 (/admin/4)", () =>
		FrameworkHistory.push("/admin/4")
	);

	return (
		<>
			<style
				dangerouslySetInnerHTML={{
					__html: `
				html, body, #root { margin: 0; padding: 0; width: 100%; height: 100%; }
			`,
				}}
			/>
			<PortalLayout
				variant={"basic"}
				headerContent={<Placeholder cssClass={"header"} />}
				menuContent={
					<RoutedMenu
						className={
							variant === "JumboDark" ? classes.menuWrapper : undefined
						}
						definition={[
							{
								icon: Home,
								title: "Home",
								route: "/",
								shouldRender: true,
							},
							{
								icon: Domain,
								title: "Admin",
								shouldRender: true,
								children: [
									{
										title: "Item 1",
										route: "/admin/1",
										shouldRender: true,
									},
									{
										title: "Item 2",
										route: "/admin/2",
										shouldRender: true,
									},
									{
										title: "Item 3",
										route: "/admin/3",
										shouldRender: true,
									},
									{
										title: "Item 4",
										route: "/admin/4",
										shouldRender: false,
									},
								],
							},
						]}
						wrapper={List}
						menuItem={
							variant === "JumboDark"
								? JumboReactDarkMenuItem
								: variant === "JumboLight"
								? JumboReactLightMenuItem
								: MaterialMenuItem
						}
						childWrapperClassName={
							variant === "JumboDark" ? classes.menuChildrenWrapper : undefined
						}
					/>
				}
				topLeft={<Placeholder cssClass={"topLeft"} />}
				content={<Placeholder cssClass={"content"} />}
				drawerWidth={320}
			/>
		</>
	);
};

PortalMenuStory.storyName = "Menu";
