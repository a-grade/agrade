import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Uni } from '../../models/uni';
import { Major } from '../../models/major';
import { Unit } from '../../models/unit';

import { DatabaseService } from '../../services/database-service';

@Component({
	selector: 'unit-list',
	templateUrl: 'unit-list.html'
})

export class UnitListPage {
	selectedUni: Uni;
	selectedMajor: Major;
	units: Unit[];

	constructor(private dbService: DatabaseService, public navCtrl: NavController, public navParams: NavParams) {
		console.debug('unit-list:constructor()');

		// If we navigated to this page, we will have an uni and major available as a nav param
		this.selectedUni = navParams.get('uni');
		console.debug("unit-list:constructor() - uni", this.selectedUni);
		this.selectedMajor = navParams.get('major');
		console.debug("unit-list:constructor() - uni", this.selectedMajor);

		console.debug('unit-list:constructor() - get units from server');
		dbService.getUnits(this.selectedUni, this.selectedMajor).subscribe(
			units => this.units = units
		);
	}

	unitSelected(unit) {
		console.debug('unit-list:unitSelected() - unit', unit);
	}
}
