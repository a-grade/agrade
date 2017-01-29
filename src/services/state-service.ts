import { Injectable } from '@angular/core';

import { Uni } from '../models/uni';
import { Major } from '../models/major';

@Injectable()
export class StateService {

	constructor() {
		console.debug('state-service:init()');
	};

	setCurrentUni(uni: Uni): void {
		console.debug('state-service:setCurrentUni(): uni', uni);
		localStorage.setItem('selectedUni', JSON.stringify(uni));
	};
	getCurrentUni(): Uni {
		console.debug('state-service:getCurrentUni()');

		const currentUni = JSON.parse(localStorage.getItem('selectedUni'));
		console.debug('state-service:getCurrentUni() - retrieved uni', currentUni);

		return currentUni;
	};

	setCurrentMajor(major: Major): void {
		console.debug('state-service:setCurrentMajor(): major', major);
		localStorage.setItem('selectedMajor', JSON.stringify(major));
	};
	getCurrentMajor(): Major {
		console.debug('state-service:getCurrentMajor()');

		const currentMajor = JSON.parse(localStorage.getItem('selectedMajor'));
		console.debug('state-service:getCurrentMajor() - retrieved major', currentMajor);

		return currentMajor;
	};
}
