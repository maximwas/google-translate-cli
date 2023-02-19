import chalk from 'chalk';
import dedent from 'dedent-js';

export class Logger {
	static printError(error) {
		console.log(chalk.red(`ERROR: ${error}`));
	}

	static printSuccess(message) {
		console.log(chalk.green(`SUCCESS: ${message}`));
	}

	static printTranslate(from, to) {
		console.log(chalk.blue(dedent`
			TRANSLATE FROM: ${from}
			TRANSLATE TO: ${to}
		`));
	}

	static printHelp() {
		console.log(dedent`
      Usage: translate [options]

      Options:
        -h, --help                  help command
        -l, --language=<language>   language to translate to
        -t, --text=<text>           text to translate
    `);
	}
}
