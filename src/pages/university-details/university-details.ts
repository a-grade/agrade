import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Wove } from 'aspect.js';

import { University } from '../../models';

import { DatabaseService, StateService } from '../../services';

@Wove({ level: 'log', logOff: true })
@Component({
	selector: 'university-details',
	templateUrl: 'university-details.html'
})
export class UniversityDetailsPage {
	get university(): University {
		return this.navParams.get("university");
	}

	constructor(
		private dbService: DatabaseService,
		private stateService: StateService,
		private navCtrl: NavController,
		private navParams: NavParams) {
	};

}
