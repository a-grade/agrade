import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Wove } from 'aspect.js';

import { Uni, Major, Module } from '../models';

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
	* Retrieves a list of modules based on a selected university and major
	*/
	getModules(uni: Uni, major: Major): FirebaseListObservable<Module[]> {
		return this.af.database.list(`/modules/${uni.$key}/${major.$key}`);
	};
}
