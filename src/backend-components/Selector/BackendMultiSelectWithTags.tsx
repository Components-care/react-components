import React, { useCallback } from "react";
import {
	BaseSelectorData,
	MultiSelectorData,
	MultiSelectWithTags,
	MultiSelectWithTagsProps,
} from "../../standalone";
import {
	Model,
	ModelFieldName,
	ModelGetResponse,
	PageVisibility,
} from "../../backend-integration";

export interface BackendMultiSelectWithTagsProps<
	GroupKeyT extends ModelFieldName,
	DataKeyT extends ModelFieldName,
	GroupVisibilityT extends PageVisibility,
	DataVisibilityT extends PageVisibility,
	GroupCustomT,
	DataCustomT
> extends Omit<
		MultiSelectWithTagsProps<MultiSelectorData, BaseSelectorData>,
		| "loadGroupEntries"
		| "loadDataOptions"
		| "loadGroupOptions"
		| "displaySwitch"
	> {
	/**
	 * The data source for groups
	 */
	groupModel: Model<GroupKeyT, GroupVisibilityT, GroupCustomT>;
	/**
	 * Callback that converts a model entry to a base selector entry
	 * @param data The record data (overview)
	 * @returns Selector data
	 * @remarks Selector data value must be set to ID
	 */
	convGroup: (data: Record<GroupKeyT, unknown>) => BaseSelectorData;
	/**
	 * Callback that gets the group entries for a given group record
	 * @param data The record data (detailed)
	 * @returns Data selector entries
	 * @remarks Selector data value must be set to ID of data record
	 */
	getGroupDataEntries: (
		data: ModelGetResponse<GroupKeyT>
	) => MultiSelectorData[];
	/**
	 * The data source for data entries
	 */
	dataModel: Model<DataKeyT, DataVisibilityT, DataCustomT>;
	/**
	 * Callback that converts a model entry to a multi selector entry
	 * @param data The record data (overview)
	 * @returns Selector data
	 * @remarks Selector data vlaue must be set to ID
	 */
	convData: (data: Record<DataKeyT, unknown>) => MultiSelectorData;
	/**
	 * Name of the switch filter for groups or undefined if disabled
	 */
	switchFilterNameGroup?: string;
	/**
	 * Name of the switch filter for data or undefined if disabled
	 */
	switchFilterNameData?: string;
}

const BackendMultiSelectWithTags = <
	GroupKeyT extends ModelFieldName,
	DataKeyT extends ModelFieldName,
	GroupVisibilityT extends PageVisibility,
	DataVisibilityT extends PageVisibility,
	GroupCustomT,
	DataCustomT
>(
	props: BackendMultiSelectWithTagsProps<
		GroupKeyT,
		DataKeyT,
		GroupVisibilityT,
		DataVisibilityT,
		GroupCustomT,
		DataCustomT
	>
) => {
	const {
		groupModel,
		convGroup,
		getGroupDataEntries,
		dataModel,
		convData,
		switchFilterNameData,
		switchFilterNameGroup,
		...selectorProps
	} = props;

	const loadGroupEntries = useCallback(
		async (data: BaseSelectorData) => {
			return getGroupDataEntries(await groupModel.getRaw(data.value));
		},
		[getGroupDataEntries, groupModel]
	);
	const loadGroupOptions = useCallback(
		async (query: string, switchValue: boolean) => {
			const [records] = await groupModel.index({
				page: 1,
				quickFilter: query,
				additionalFilters: switchFilterNameGroup
					? { [switchFilterNameGroup]: switchValue }
					: undefined,
			});
			return records.map(convGroup);
		},
		[convGroup, groupModel, switchFilterNameGroup]
	);
	const loadDataOptions = useCallback(
		async (query: string, switchValue: boolean) => {
			const [records] = await dataModel.index({
				page: 1,
				quickFilter: query,
				additionalFilters: switchFilterNameData
					? { [switchFilterNameData]: switchValue }
					: undefined,
			});
			return records.map(convData);
		},
		[convData, dataModel, switchFilterNameData]
	);

	return (
		<MultiSelectWithTags
			{...selectorProps}
			loadGroupEntries={loadGroupEntries}
			loadDataOptions={loadDataOptions}
			loadGroupOptions={loadGroupOptions}
			displaySwitch={!!(switchFilterNameGroup || switchFilterNameData)}
		/>
	);
};

export default React.memo(
	BackendMultiSelectWithTags
) as typeof BackendMultiSelectWithTags;
