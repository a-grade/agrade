import { Injectable } from '@angular/core';
import { Wove } from 'aspect.js';

import { Uni } from '../models/uni';
import { Major } from '../models/major';

@Wove()
@Injectable()
export class StateService {

	private saveObject(key: string, value: any): void {
		localStorage.setItem(key, JSON.stringify(value));
	};
	private getObject(key: string) {
		return JSON.parse(localStorage.getItem(key));
	}

	setCurrentUni(uni: Uni): void {
		this.saveObject('selectedUni', uni);
	};
	getCurrentUni(): Uni {
		return this.getObject('selectedUni');
	};

	setCurrentMajor(major: Major): void {
		this.saveObject('selectedMajor', major);
	};
	getCurrentMajor(): Major {
		return this.getObject('selectedMajor');
	};
}
