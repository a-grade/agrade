import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Wove } from 'aspect.js';

import { Uni } from '../../models/uni';
import { Major } from '../../models/major';
import { Unit } from '../../models/unit';

import { DatabaseService } from '../../services/database-service';
import { StateService } from '../../services/state-service';

@Wove()
@Component({
	selector: 'unit-list',
	templateUrl: 'unit-list.html'
})

export class UnitListPage {
	get selectedUni(): Uni {
		return this.navParams.get('uni');
	};
	get selectedMajor(): Major {
		return this.navParams.get('major');
	};
	units: Unit[];

	constructor(
		private dbService: DatabaseService,
		private stateService: StateService,
		private navCtrl: NavController,
		private navParams: NavParams,
	) {
		dbService
			.getUnits(this.selectedUni, this.selectedMajor)
			.subscribe(units => this.units = units );
	}

	backToMajorList() {
		this.stateService.setCurrentMajor(null);
	}

	unitLocked(unit) {
		return true;
	}

	unitSelected(unit) {
		this.units.forEach(unit => {});
	}
}
