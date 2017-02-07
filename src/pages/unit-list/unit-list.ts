import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Wove } from 'aspect.js';

import { Uni, Major, Unit } from '../../models';

import { MajorDetailsPage } from '../major-details/major-details'

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

	goToMajorDetails() {
		this.navCtrl.push(MajorDetailsPage, {
			major : this.selectedMajor
		});
	}

	unitLocked(unit) {
		return unit.checked;
	}

	unitSelected(unit) {
		this.units.forEach(unit => {});
	}

	unitToggleCheck(unit) {
		unit.checked = !unit.checked;
	}
}
