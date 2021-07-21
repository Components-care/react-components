import React from "react";
import { BadgeProps, PopoverProps } from "@material-ui/core";
import { InfiniteScrollProps } from "../InfiniteScroll";
export interface Notification {
    /**
     * An unique identifier for the notification
     */
    id: string;
    /**
     * An optional image for the notification (URL)
     */
    image?: string;
    /**
     * The main message of the notification
     */
    message: React.ReactChild;
    /**
     * The sub message of the notification, shown before it's age
     */
    origin?: React.ReactChild;
    /**
     * The timestamp of creation of this notification
     */
    created: Date;
    /**
     * When the notification expires (hides)
     */
    expires?: Date;
    /**
     * Has the user already read the notification?
     */
    read: boolean;
}
export interface NotificationsProps {
    /**
     * Properties to pass to the notification count badge
     */
    BadgeProps?: BadgeProps;
    /**
     * Properties to pass to the popover showing the notifications
     */
    PopoverProps?: PopoverProps;
    /**
     * Callback which is fired by the infinite scroll to load old notifications
     */
    loadMore: InfiniteScrollProps["loadMoreBottom"];
    /**
     * A custom notification renderer (optional)
     * @param notification The notification to render
     */
    notificationRenderer?: (notification: Notification) => React.ReactElement;
    /**
     * The notifications to display (should be updated by loadMore)
     */
    notifications: Notification[];
    /**
     * Event handler which fires when the user opens the notifications
     */
    onOpen?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
    /**
     * Custom styles
     */
    classes?: Partial<ReturnType<typeof useStyles>>;
}
declare const useStyles: (props?: any) => import("@material-ui/styles").ClassNameMap<"notificationArea">;
declare const _default: React.MemoExoticComponent<(props: NotificationsProps) => JSX.Element>;
export default _default;
