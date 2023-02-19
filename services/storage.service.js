import { homedir } from 'os';
import { promises } from 'fs';
import path from 'path';

import { Logger } from './log.service.js';

const filePath = path.join(homedir(), 'translate-cli.json');

export const STORAGE_KEYS = {
	'LANGUAGE': 'language'
};

export class Storage {
	static async saveKeyValue(key, value) {
		try {
			let data = {};

			if (await this._isExist(filePath)) {
				const fileData = await promises.readFile(filePath, 'utf-8');
				data = JSON.parse(fileData);
			}

			data[key] = value;
			await promises.writeFile(filePath, JSON.stringify(data));
		} catch (error) {
			Logger.printError(error);
		}
	}

	static async getValue(key) {
		try {
			if (await this._isExist(filePath)) {
				const fileData = await promises.readFile(filePath, 'utf-8');
				let data = JSON.parse(fileData);

				return data[key];
			}

			return '';
		} catch (error) {
			Logger.printError(error);
		}
	}

	static async _isExist(path) {
		try {
			await promises.stat(path);

			return true;
		} catch (error) {
			return false;
		}
	}
}
