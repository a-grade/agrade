import { Injectable } from '@angular/core';
import { Wove } from 'aspect.js';

import { University, Major } from '../models';

@Wove()
@Injectable()
export class StateService {

	private saveObject(key: string, value: any): void {
		localStorage.setItem(key, JSON.stringify(value));
	};
	private getObject(key: string) {
		return JSON.parse(localStorage.getItem(key));
	}

	setCurrentUniversity(university: University): void {
		this.saveObject('selectedUniversity', university);
	};
	getCurrentUniversity(): University {
		return this.getObject('selectedUniversity');
	};

	setCurrentMajor(major: Major): void {
		this.saveObject('selectedMajor', major);
	};
	getCurrentMajor(): Major {
		return this.getObject('selectedMajor');
	};
}
