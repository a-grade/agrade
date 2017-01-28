import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UnitListPage } from '../unit-list/unit-list';

import { Uni } from '../../models/uni';
import { Major } from '../../models/major';

import { DatabaseService } from '../../services/database-service';
import { StateService } from '../../services/state-service';

@Component({
	selector: 'major-list',
	templateUrl: 'major-list.html'
})
export class MajorListPage {
	selectedUni: Uni;
	noMajorsAvailable: boolean = false;
	majors: Major[];

	constructor(private dbService: DatabaseService, private stateService: StateService, public navCtrl: NavController, public navParams: NavParams) {
		console.debug("major-list:constructor()");

		// If we navigated to this page, we will have an uni available as a nav param
		this.selectedUni = navParams.get('uni');
		console.debug("major-list:constructor() - uni", this.selectedUni);

		const previouslySelectedMajor = stateService.getCurrentMajor();
		console.debug('major-list:constructor() - old major', previouslySelectedMajor);

		if (previouslySelectedMajor) {
			console.debug('major-list:constructor() - show units for saved major');
			this.majorSelected(previouslySelectedMajor);
		} else {
			console.debug('uni-list:constructor() - get majors from server');
			dbService.getMajors(this.selectedUni).subscribe(majors => {
				this.majors = majors;
				console.debug("major-list:constructor() - majors", this.majors);

				this.noMajorsAvailable = majors.length <= 0;
				console.debug("major-list:constructor() - noMajorsAvailable", this.noMajorsAvailable);
			});
		}
	}

	majorSelected(major) {
		console.debug('major-list:majorSelected()', major);
		this.navCtrl.push(UnitListPage, {
			uni: this.selectedUni,
			major: major,
		});
	};
}
