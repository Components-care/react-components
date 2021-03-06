import React, { useCallback, useContext, useMemo, useState } from "react";
import Model, {
	ModelFieldName,
	PageVisibility,
} from "../../backend-integration/Model/Model";
import {
	Route,
	RouteChildrenProps,
	Switch,
	useRouteMatch,
	useHistory,
	useLocation,
} from "react-router-dom";
import BackendDataGrid, { BackendDataGridProps } from "../DataGrid";
import { Form, FormProps } from "../Form";
import {
	hasPermission,
	Permission,
	usePermissionContext,
} from "../../framework";
import { makeStyles } from "@material-ui/core/styles";

export interface CrudFormProps {
	/**
	 * Callback for closing the form page
	 */
	goBack: () => void;
}

export interface CrudProps<
	KeyT extends ModelFieldName,
	VisibilityT extends PageVisibility,
	CustomT
> {
	/**
	 * The model to use
	 */
	model: Model<KeyT, VisibilityT, CustomT>;
	/**
	 * The properties to pass to form
	 */
	formProps: Omit<
		FormProps<KeyT, VisibilityT, CustomT, CrudFormProps>,
		"id" | "model" | "children" | "customProps"
	>;
	/**
	 * The renderer function which returns the form component
	 * @remarks Can be set to undefined to only render the Grid
	 */
	children:
		| FormProps<KeyT, VisibilityT, CustomT, CrudFormProps>["children"]
		| undefined;
	/**
	 * The properties to pass to grid
	 * @remarks onAddNew can be used to overwrite the new button action
	 */
	gridProps: Omit<
		BackendDataGridProps<KeyT, VisibilityT, CustomT>,
		| "model"
		| "enableDelete"
		| "disableExport"
		| "onEdit"
		| "forceRefreshToken"
		| "onAddNew"
	> &
		Pick<Partial<BackendDataGridProps<KeyT, VisibilityT, CustomT>>, "onAddNew">;
	/**
	 * The delete record permission
	 */
	deletePermission: Permission;
	/**
	 * The view permission (shows form in read-only mode if edit permission is not present)
	 * Set to `false` to only show the form page if edit permissions are present
	 */
	readPermission: Permission;
	/**
	 * The edit record permission
	 */
	editPermission: Permission;
	/**
	 * The create new record permission
	 */
	newPermission: Permission;
	/**
	 * The export records permission
	 */
	exportPermission: Permission;
	/**
	 * Disables routing and uses an internal state instead (useful for dialogs)
	 */
	disableRouting?: boolean;
	/**
	 * Unmounts the grid when showing form. Resets scroll in grid when coming back from form.
	 * Useful for performance optimization or dialog handling where no Grid is shown
	 */
	disableBackgroundGrid?: boolean;
	/**
	 * If routing is disabled: set the initial view (id, "new" or null), defaults to null
	 */
	initialView?: string | null;
	/**
	 * Forbidden page to show if the user navigated to a URL he has no permissions for
	 * If not set: Shows edit form in read-only mode
	 */
	forbiddenPage?: React.ComponentType;
	/**
	 * Route component to use
	 */
	routeComponent?: typeof Route;
}

const useStyles = makeStyles(
	{
		hide: {
			display: "none",
			width: "100%",
			height: "100%",
		},
		show: {
			width: "100%",
			height: "100%",
		},
	},
	{ name: "CcCrud" }
);

export interface CrudDispatch {
	/**
	 * Force-refreshes the grid
	 */
	refreshGrid: () => void;
}

const CrudDispatchContext = React.createContext<CrudDispatch | undefined>(
	undefined
);
export const useCrudDispatchContext = (): CrudDispatch => {
	const ctx = useContext(CrudDispatchContext);
	if (!ctx) throw new Error("CrudDispatchContext not set");
	return ctx;
};

const CRUD = <
	KeyT extends ModelFieldName,
	VisibilityT extends PageVisibility,
	CustomT
>(
	props: CrudProps<KeyT, VisibilityT, CustomT>
) => {
	const history = useHistory();
	const { path, url } = useRouteMatch();
	const location = useLocation();
	const [perms] = usePermissionContext();
	const {
		disableRouting,
		disableBackgroundGrid,
		forbiddenPage: ForbiddenPage,
	} = props;
	const RouteComponent = props.routeComponent ?? Route;
	const [id, setId] = useState<string | null>(props.initialView ?? null);
	const [gridRefreshToken, setGridRefreshToken] = useState<string>(
		new Date().getTime().toString()
	);
	const classes = useStyles();

	const showEditPage = useCallback(
		(id: string) => {
			if (disableRouting) {
				setId(id);
			} else {
				history.push(`${url}/${id}`);
			}
		},
		[history, url, disableRouting]
	);

	const showNewPage = useCallback(() => {
		if (disableRouting) {
			setId("new");
		} else {
			history.push(`${url}/new`);
		}
	}, [history, url, disableRouting]);

	const showOverview = useCallback(() => {
		if (disableRouting) {
			setId(null);
		} else {
			history.push(url);
		}
	}, [history, url, disableRouting]);

	const refreshGrid = useCallback(() => {
		setGridRefreshToken(new Date().getTime().toString());
	}, []);

	const handleSubmit = useCallback(
		async (data: Record<KeyT, unknown>) => {
			if (props.formProps.onSubmit) {
				await props.formProps.onSubmit(data);
			}

			// redirect to edit page
			const { id } = data as Record<"id", string>;
			if (disableRouting) {
				setId((oldId) => (oldId === null ? null : id));
			} else if (location.pathname.endsWith("/new")) {
				history.push(`${url}/${id}`);
			}

			refreshGrid();
		},
		[
			props.formProps,
			disableRouting,
			location.pathname,
			history,
			url,
			refreshGrid,
		]
	);

	const grid = () => (
		<BackendDataGrid
			enableDelete={hasPermission(perms, props.deletePermission)}
			disableExport={!hasPermission(perms, props.exportPermission)}
			{...props.gridProps}
			model={props.model}
			forceRefreshToken={gridRefreshToken}
			onEdit={
				(hasPermission(perms, props.readPermission) ||
					hasPermission(perms, props.editPermission)) &&
				props.children
					? showEditPage
					: undefined
			}
			onAddNew={
				hasPermission(perms, props.newPermission) && props.children
					? props.gridProps.onAddNew ?? showNewPage
					: undefined
			}
		/>
	);

	const form = (
		id: string,
		formComponent: NonNullable<typeof props.children>
	) => (
		<Form
			id={id === "new" ? null : id}
			model={props.model}
			readOnly={!hasPermission(perms, props.editPermission)}
			{...props.formProps}
			onSubmit={handleSubmit}
			customProps={{
				goBack: showOverview,
			}}
		>
			{formComponent}
		</Form>
	);

	const dispatch = useMemo(
		() => ({
			refreshGrid,
		}),
		[refreshGrid]
	);

	return (
		<CrudDispatchContext.Provider value={dispatch}>
			{disableRouting ? (
				<>
					{(id === null || !disableBackgroundGrid) && (
						<div className={id !== null ? classes.hide : classes.show}>
							{grid()}
						</div>
					)}
					{id !== null && props.children && form(id, props.children)}
				</>
			) : (
				<>
					{(id === null || !disableBackgroundGrid) && (
						<div
							className={
								location.pathname === url ? classes.show : classes.hide
							}
						>
							{grid()}
						</div>
					)}
					{props.children && (
						<Switch>
							<RouteComponent path={`${path}/:id`} exact>
								{hasPermission(perms, props.readPermission) ||
								hasPermission(perms, props.editPermission) ||
								!ForbiddenPage ? (
									(routeProps: RouteChildrenProps<{ id: string }>) =>
										props.children &&
										form(routeProps.match?.params.id ?? "", props.children)
								) : (
									<ForbiddenPage />
								)}
							</RouteComponent>
						</Switch>
					)}
				</>
			)}
		</CrudDispatchContext.Provider>
	);
};

export default React.memo(CRUD) as typeof CRUD;
