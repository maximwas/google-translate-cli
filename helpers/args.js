import _ from 'lodash';

export const getArgs = () => {
	const [executer, file, ...rest] = process.argv;
	let prevArg = '';

	const args = _.reduce(rest, (acc, arg) => {
		if (arg.charAt(0) === '-') {
			const [key, value] = arg.split('=');
			const name = key.replace(/-/g, '');

			if (!value) {
				prevArg = name;
				acc[name] = true;

				return acc;
			}

			prevArg = name;
			acc[name] = value;

			return acc;
		}

		if (arg.charAt(0) !== '-') {
			acc[prevArg] = `${acc[prevArg]} ${arg}`;

			return acc;
		}
	}, {});

	return args;
};
