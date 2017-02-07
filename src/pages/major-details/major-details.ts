import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Wove } from 'aspect.js';

import { Major } from '../../models';

import { DatabaseService, StateService } from '../../services';

@Wove({ level: 'log', logOff: true })
@Component({
	selector: 'major-details',
	templateUrl: 'major-details.html'
})
export class MajorDetailsPage {
	get major(): Major {
		return this.navParams.get("major");
	}

	constructor(
		private dbService: DatabaseService,
		private stateService: StateService,
		private navCtrl: NavController,
		private navParams: NavParams) {
	};

}
