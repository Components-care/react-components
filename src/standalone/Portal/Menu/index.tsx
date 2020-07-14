import React, { Dispatch, SetStateAction, useState } from "react";
import { MenuContext, toMenuItemComponent } from "./MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { SvgIconComponent } from "@material-ui/icons";

/**
 * Properties of the Wrapper
 */
export interface IMenuWrapperProps {
	/**
	 * The actual menu entries
	 */
	children: React.ReactNode;
}

/**
 * Properties of a menu item component
 */
export interface IMenuItemProps {
	/**
	 * An optional icon
	 */
	icon?: SvgIconComponent;
	/**
	 * The text of the menu entry
	 */
	title: string;
	/**
	 * The onClick handler
	 */
	onClick: () => void;
	/**
	 * Is this menu entry expandable? (does it have children?)
	 */
	expandable: boolean;
	/**
	 * Is this menu item currently selected/active
	 */
	active?: boolean; // set if expandable == false
	/**
	 * Is this menu item currently expanded
	 */
	expanded?: boolean; // set if expandable == true
	/**
	 * The depth in the menu tree
	 */
	depth: number;
}

/**
 * The menu item definition
 */
export interface IMenuItemDefinition {
	/**
	 * The icon of the menu item
	 */
	icon?: SvgIconComponent;
	/**
	 * The text of the menu item
	 */
	title: string;
	/**
	 * The click handler of the menu item
	 */
	onClick: () => void;
	/**
	 * Should this menu item be rendered? Useful for permission checks
	 */
	shouldRender: boolean;
	/**
	 * Should this entry forcibly expand? Used by RoutedMenu to auto-expand
	 */
	forceExpand?: boolean;
	/**
	 * The children of this menu entry
	 */
	children?: IMenuItemDefinition[];
}

export type MenuItemComponent = React.ComponentType<IMenuItemProps>;

/**
 * The menu properties
 */
export interface IMenuProps {
	/**
	 * The definition of the menu items
	 */
	definition: IMenuItemDefinition[];
	/**
	 * The wrapper element wrapping the menu items
	 */
	wrapper: React.ElementType<IMenuWrapperProps>;
	/**
	 * The menu item renderer component
	 */
	menuItem: MenuItemComponent;
	/**
	 * The class name to assign to the div wrapping the Wrapper
	 */
	className?: string;
	/**
	 * The class name to assign to the collapse wrapping the children of menu items
	 */
	childWrapperClassName?: string;
	/**
	 * Custom state which can be used to control the active menu entry
	 * Contains a string concatenated from menu item depth (zero based) and the menu item title
	 */
	customState?: [string, Dispatch<SetStateAction<string>>];
}

const useStyles = makeStyles({
	root: {
		height: "100%",
		width: "100%",
		overflow: "auto",
	},
});

export default (props: IMenuProps) => {
	const Wrapper = props.wrapper;
	const state = useState("");
	const classes = useStyles();

	return (
		<div className={`${classes.root} ${props.className || ""}`}>
			<Wrapper>
				<MenuContext.Provider value={props.customState || state}>
					{props.definition.map((child) =>
						toMenuItemComponent(props, child, 0)
					)}
				</MenuContext.Provider>
			</Wrapper>
		</div>
	);
};