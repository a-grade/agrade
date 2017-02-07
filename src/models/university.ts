
export class University {
	$key: string;
	name: string;
	shortName: string;
	constructor(key: string, name: string, shortName: string) {
		this.$key = key;
		this.name = name;
		this.shortName = shortName;
	};
}
