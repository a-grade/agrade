import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Wove } from 'aspect.js';

import { Uni } from '../models/uni';
import { Major } from '../models/major';
import { Unit } from '../models/unit';

@Wove()
@Injectable()
export class DatabaseService {

	constructor(private af: AngularFire) {
	}

	/*
	* Retrieves the list of universities in the system
	*/
	getUnis(): FirebaseListObservable<Uni[]> {
		return this.af.database.list(`/universities`);
	};

	/**
	* Retrieves a list of majors based on a selected university
	*/
	getMajors(uni: Uni): FirebaseListObservable<Major[]> {
		return this.af.database.list(`/majors/${uni.$key}`);
	};

	/**
	* Retrieves a list of units based on a selected university and major
	*/
	getUnits(uni: Uni, major: Major): FirebaseListObservable<Unit[]> {
		return this.af.database.list(`/units/${uni.$key}/${major.$key}`);
	};
}
