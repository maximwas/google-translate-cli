import { getArgs } from './helpers/args.js';
import { Logger } from './services/log.service.js';
import { Translate } from './services/api.service.js';
import { Storage, STORAGE_KEYS } from './services/storage.service.js';

const getParameters = async () => {
	try {
		const args = getArgs();
		const storageLanguage = await Storage.getValue(STORAGE_KEYS.LANGUAGE);
		const language = args.l || args.language || storageLanguage;
		const help = args.h || args.help;
		const text = args.t || args.text;

		return {
			storageLanguage,
			language,
			help,
			text
		};
	} catch (error) {
		Logger.printError(error);
	}
};

const saveLanguage = async (language) => {
	try {
		await Storage.saveKeyValue(STORAGE_KEYS.LANGUAGE, language);
		Logger.printSuccess(`Language changed to ${language}`);
		process.exit(0);
	} catch (error) {
		Logger.printError(error);
	}
};

const initCLI = async () => {
	try {
		const parameters = await getParameters();

		if (parameters.language && parameters.language !== parameters.storageLanguage) {
			await saveLanguage(parameters.language);
		}

		if (parameters.help) {
			Logger.printHelp();
		}

		if (!parameters.text && !parameters.help) {
			Logger.printError('Please write a text to translate');
		}

		if (!parameters.language && !parameters.help) {
			Logger.printError('Please write a language to translate to');
		}

		if (parameters.text && parameters.language) {
			const text = await Translate.getTranslate(parameters.language, parameters.text);
			Logger.printTranslate(parameters.text, text);
		}
	} catch (error) {
		Logger.printError(error);
	}
};

initCLI();
