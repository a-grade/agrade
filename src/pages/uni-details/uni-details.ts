import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Wove } from 'aspect.js';

import { Uni } from '../../models/uni';

import { DatabaseService } from '../../services/database-service';
import { StateService } from '../../services/state-service';

@Wove({ level: 'log', logOff: true })
@Component({
	selector: 'uni-details',
	templateUrl: 'uni-details.html'
})
export class UniDetailsPage {
	get uni(): Uni {
		return this.navParams.get("uni");
	}

	constructor(
		private dbService: DatabaseService,
		private stateService: StateService,
		private navCtrl: NavController,
		private navParams: NavParams) {
	};

}
