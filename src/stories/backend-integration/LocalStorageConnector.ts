import {
	AdvancedDeleteRequest,
	Connector,
	filterSortPaginate,
	Model,
	ModelFieldName,
	PageVisibility,
	ResponseMeta,
} from "../..";
import {
	DataGridRowData,
	IDataGridLoadDataParameters,
} from "../../standalone/DataGrid";

class LocalStorageConnector<
	KeyT extends ModelFieldName
> extends Connector<KeyT> {
	key: string;

	/**
	 * Creates a new local storage connector
	 * @param key The storage key
	 */
	constructor(key: string) {
		super();

		this.key = key;
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async index(
		params?: Partial<IDataGridLoadDataParameters>,
		model?: Model<KeyT, PageVisibility, unknown>
	): Promise<[Record<KeyT, unknown>[], ResponseMeta]> {
		if (!model) {
			throw new Error("Can't index: No model specified");
		}

		const db = this.getDB();
		const processed = filterSortPaginate(
			Object.values(db) as DataGridRowData[],
			Object.assign(
				{
					page: 1,
					rows: 25,
					sort: [],
					quickFilter: "",
					fieldFilter: {},
					additionalFilters: {},
				},
				params
			),
			model.toDataGridColumnDefinition()
		);
		return [
			processed[0],
			{
				totalRows: Object.keys(db).length,
				filteredRows: processed[1],
			},
		];
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async create(data: Record<string, unknown>): Promise<Record<KeyT, unknown>> {
		if ("id" in data) {
			throw new Error("Can't create: Creation request contains ID");
		}
		const db = this.getDB();
		// generate random ID
		const id = [...new Array<number>(16)]
			.map(() => Math.floor(Math.random() * 16).toString(16))
			.join("");

		data["id"] = id;
		db[id] = data;
		this.setDB(db);

		return data;
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async read(id: string): Promise<Record<KeyT, unknown>> {
		const db = this.getDB();
		if (!(id in db)) {
			throw new Error("Can't read: Record not found");
		}
		return db[id];
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async update(
		data: Record<ModelFieldName, unknown>
	): Promise<Record<KeyT, unknown>> {
		const db = this.getDB();
		const id = data["id"] as string;
		if (!(id in db)) {
			throw new Error("Can't read: Record not found");
		}
		db[id] = data;
		this.setDB(db);
		return data;
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async delete(id: string): Promise<void> {
		const db = this.getDB();
		if (!(id in db)) {
			throw new Error("Can't delete: Record not found");
		}
		delete db[id];
		this.setDB(db);
	}

	deleteAdvanced = async (
		req: AdvancedDeleteRequest,
		model?: Model<KeyT, PageVisibility, unknown>
	): Promise<void> => {
		const [invert, ids, filter] = req;
		if (!invert) {
			await super.deleteMultiple(ids, model);
			return;
		}
		const toDelete = await this.index({
			page: 1,
			rows: Number.MAX_SAFE_INTEGER,
			sort: [],
			...filter,
		});
		const matchingIds = toDelete[0]
			.map((entry) => (entry as Record<"id", string>).id)
			.filter((id) => !ids.includes(id));
		return super.deleteMultiple(matchingIds, model);
	};

	private getDB(): Record<string, Record<KeyT, unknown>> {
		const dataStr = localStorage.getItem(this.key);
		if (!dataStr) return {};
		try {
			return JSON.parse(dataStr) as Record<string, Record<KeyT, unknown>>;
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error(
				"[Components-Care] [LocalStorageConnector] Failed parsing data",
				e
			);
			return {};
		}
	}

	private setDB(data: Record<string, Record<KeyT, unknown>>) {
		return localStorage.setItem(this.key, JSON.stringify(data));
	}
}

export default LocalStorageConnector;