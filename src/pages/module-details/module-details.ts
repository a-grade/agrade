import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Wove } from 'aspect.js';

import { Module } from '../../models';

import { DatabaseService, StateService } from '../../services';

@Wove()
@Component({
	selector: 'module-details',
	templateUrl: 'module-details.html'
})
export class ModuleDetailsPage {
	get module(): Module {
		return this.navParams.get("module");
	}

	constructor(
		private dbService: DatabaseService,
		private stateService: StateService,
		private navCtrl: NavController,
		private navParams: NavParams) {
	};

}
