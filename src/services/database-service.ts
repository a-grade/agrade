import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Wove } from 'aspect.js';

import { University, Major, Module } from '../models';

@Wove()
@Injectable()
export class DatabaseService {

	constructor(private af: AngularFire) {
	}

	/*
	* Retrieves the list of university in the system
	*/
	getUniversities(): FirebaseListObservable<University[]> {
		return this.af.database.list(`/universities`);
	};

	/**
	* Retrieves a list of majors based on an university
	*/
	getMajors(university: University): FirebaseListObservable<Major[]> {
		return this.af.database.list(`/majors/${university.$key}`);
	};

	/**
	* Retrieves a list of modules based on an university and major
	*/
	getModules(university: University, major: Major): FirebaseListObservable<Module[]> {
		return this.af.database.list(`/modules/${university.$key}/${major.$key}`);
	};
}
