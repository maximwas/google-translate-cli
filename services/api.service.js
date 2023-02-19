import { detectOne } from 'langdetect';
import axios from 'axios';
import _ from 'lodash';
import { Logger } from './log.service.js';

export class Translate {
	static async getTranslate(to, text) {
		try {
			const from = detectOne(text);
			const url = 'https://translate.googleapis.com/translate_a/single';
			const { data } = await axios.get(url, {
				'params': {
					'client': 'gtx',
					'dt': 't',
					'sl': from,
					'tl': to,
					'q': text
				}
			});

			return this._getTranslateText(data);
		} catch (error) {
			Logger.printError(error);
		}
	}

	static _getTranslateText(data) {
		if (!data[0]) {
			return '';
		}

		return _(data[0]).map((item) => item[0]).join('');
	}
}
