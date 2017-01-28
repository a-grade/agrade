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
		// TODO save this to the cookie
	};
	getCurrentUni(): Uni {
		console.debug('state-service:getCurrentUni(): currently this is mocked as ufscar');
		// TODO add scenario when it is first time of the user
		return new Uni('ufscar', 'Universidade Federal de São Carlos', 'UFSCar');
	};

	setCurrentMajor(major: Major): void {
		console.debug('state-service:setCurrentMajor(): major', major);
		// TODO save this to the cookie
	};
	getCurrentMajor(): Major {
		console.debug('state-service:getCurrentMajor()');
		// TODO add scenario when it is first time of the user
		return new Major('bcc', 'Bacharelado em Ciência da Computação', 'BCC');
	};
}
