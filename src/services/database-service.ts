import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


import { Uni } from '../models/uni';
import { Major } from '../models/major';
import { Unit } from '../models/unit';

@Injectable()
export class DatabaseService {

	constructor(public af: AngularFire) {
		console.debug('database-service:init(): angular fire', af);
	}

	/*
	* Retrieves the list of universities in the system
	*/
	getUnis(): FirebaseListObservable<Uni[]> {
		console.debug('database-service:getUnis()');
		return this.af.database.list(`/universities`);
	};

	/**
	* Retrieves a list of majors based on a selected university
	*/
	getMajors(uni: Uni): FirebaseListObservable<Major[]> {
		console.debug('database-service:getMajors(): uni', uni);
		return this.af.database.list(`/majors/${uni.$key}`);
	};

	/**
	* Retrieves a list of units based on a selected university and major
	*/
	getUnits(uni: Uni, major: Major): FirebaseListObservable<Unit[]> {
		console.debug('database-service:getUnits(): uni', uni, 'major', major);
		return this.af.database.list(`/units/${uni.$key}/${major.$key}`);
	};
}
