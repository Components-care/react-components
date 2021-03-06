import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
	BaseSelectorData,
	BaseSelectorProps,
	SelectorLruOptions,
	SingleSelect,
} from "../../standalone";
import Model, {
	ModelFieldName,
	PageVisibility,
} from "../../backend-integration/Model/Model";
import { debouncePromise } from "../../utils";
import useCCTranslations from "../../utils/useCCTranslations";
import { DataGridSortSetting } from "../../standalone/DataGrid/DataGrid";

export type BackendSingleSelectLruOptions<
	DataT extends BaseSelectorData
> = Omit<SelectorLruOptions<DataT>, "loadData">;

export interface BackendSingleSelectProps<
	KeyT extends ModelFieldName,
	VisibilityT extends PageVisibility,
	CustomT
> extends Omit<
		BaseSelectorProps<BaseSelectorData>,
		"onLoad" | "selected" | "onSelect" | "lru"
	> {
	/**
	 * The model to use
	 */
	model: Model<KeyT, VisibilityT, CustomT>;
	/**
	 * The debounce time for search in ms
	 * @default 500
	 */
	searchDebounceTime?: number;
	/**
	 * Callback that converts the model data to the actual data displayed in the selector
	 * @param modelData The model data
	 */
	modelToSelectorData: (
		modelData: Record<KeyT, unknown>
	) => Promise<BaseSelectorData> | BaseSelectorData;
	/**
	 * The amount of search results to load (defaults to 25)
	 */
	searchResultLimit?: number;
	/**
	 * Selection change handler
	 * @param data The selected data entry/entries values
	 */
	onSelect?: (value: string | null) => void;
	/**
	 * The currently selected values
	 */
	selected: string | null;
	/**
	 * Sort settings
	 */
	sort?: DataGridSortSetting[];
	/**
	 * Initial data (model format) used for selected cache
	 */
	initialData?: Record<KeyT, unknown>[];
	/**
	 * LRU settings
	 */
	lru?: BackendSingleSelectLruOptions<BaseSelectorData>;
}

const BackendSingleSelect = <
	KeyT extends ModelFieldName,
	VisibilityT extends PageVisibility,
	CustomT
>(
	props: BackendSingleSelectProps<KeyT, VisibilityT, CustomT>
) => {
	const {
		model,
		modelToSelectorData,
		searchResultLimit,
		onSelect,
		selected,
		initialData,
		searchDebounceTime,
		sort,
		lru,
		...otherProps
	} = props;

	const [selectedCache, setSelectedCache] = useState<BaseSelectorData | null>(
		null
	);

	const { t } = useCCTranslations();

	const handleLoad = useCallback(
		async (search: string) => {
			const data = await model.index({
				page: 1,
				rows: searchResultLimit ?? 25,
				sort: sort,
				quickFilter: search,
			});
			return Promise.all(data[0].map(modelToSelectorData));
		},
		[model, modelToSelectorData, sort, searchResultLimit]
	);

	const handleLoadRecord = useCallback(
		async (id: string): Promise<BaseSelectorData> => {
			const [data] = await model.getCached(id);
			return modelToSelectorData(data);
		},
		[model, modelToSelectorData]
	);

	const lruConfig: SelectorLruOptions<BaseSelectorData> | undefined = useMemo(
		() =>
			lru
				? {
						...lru,
						loadData: handleLoadRecord,
				  }
				: undefined,
		[lru, handleLoadRecord]
	);

	const handleSelect = useCallback(
		(selected: BaseSelectorData | null) => {
			setSelectedCache(selected);
			if (onSelect) {
				onSelect(selected ? selected.value : null);
			}
		},
		[onSelect]
	);

	// fetch missing data entries
	useEffect(() => {
		if (!selected) return;
		if (selectedCache?.value === selected) return;

		void (async () => {
			let newCache: BaseSelectorData | null = null;
			if (initialData) {
				// process initial data
				const selectedRecord = initialData.find(
					(record) => record["id" as keyof typeof record] === selected
				);
				if (selectedRecord) {
					newCache = await modelToSelectorData(selectedRecord);
				}
			}

			if (!newCache) {
				try {
					const data = await model.getCached(selected);
					newCache = await modelToSelectorData(data[0]);
				} catch (e) {
					newCache = {
						value: selected,
						label:
							(e as Error).message ??
							t("backend-components.selector.loading-error"),
					};
				}
			}
			setSelectedCache((oldCache) => Object.assign({}, oldCache, newCache));
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected]);

	const debouncedLoad = useMemo(
		() => debouncePromise(handleLoad, searchDebounceTime ?? 500),
		[handleLoad, searchDebounceTime]
	);

	return (
		<SingleSelect
			{...otherProps}
			onLoad={debouncedLoad}
			onSelect={handleSelect}
			selected={
				selected
					? selectedCache ?? {
							value: selected,
							label: t("backend-components.selector.loading"),
					  }
					: null
			}
			lru={lruConfig}
		/>
	);
};

export default React.memo(BackendSingleSelect) as typeof BackendSingleSelect;
