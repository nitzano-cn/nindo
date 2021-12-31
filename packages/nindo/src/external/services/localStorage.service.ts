interface ILocalStorageObject {
	[key: string]: any;
}

class LocalStorageService {
	public pluginId: string = '';
	private prefix: string = 'plugin_storage';
	private isLocalStorageSupported: boolean;

	constructor() {
		this.isLocalStorageSupported = false;
		// Fixing error for blocked 3rd party cookies
		try {
			this.isLocalStorageSupported =
				typeof window !== 'undefined' && !!window.localStorage;
		} catch (e) {}
	}

	private getPluginStorage(): ILocalStorageObject {
		if (!this.isLocalStorageSupported) {
			return {};
		}

		return JSON.parse(
			window.localStorage.getItem(`${this.prefix}_${this.pluginId}`) || '{}'
		);
	}

	private setPluginStorage(value: ILocalStorageObject): ILocalStorageObject {
		if (!this.isLocalStorageSupported) {
			return this.getPluginStorage();
		}

		window.localStorage.setItem(
			`${this.prefix}_${this.pluginId}`,
			JSON.stringify(value)
		);

		return this.getPluginStorage();
	}

	private deletePluginStorage(): boolean {
		if (!this.isLocalStorageSupported) {
			return false;
		}

		window.localStorage.removeItem(`${this.prefix}_${this.pluginId}`);

		return true;
	}

	public get(key: string) {
		const storage = this.getPluginStorage();
		return storage[key];
	}

	public set(key: string, value: any) {
		const storage = this.getPluginStorage();
		storage[key] = value;
		return this.setPluginStorage(storage);
	}

	public delete(key: string) {
		const storage = this.getPluginStorage();
		delete storage[key];
		return this.setPluginStorage(storage);
	}

	public destroyAll() {
		return this.deletePluginStorage();
	}
}

export const localStorageService = new LocalStorageService();
