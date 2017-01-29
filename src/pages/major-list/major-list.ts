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
	}

	ionViewWillEnter() {
		console.debug("major-list:ionViewWillEnter()");

		// If we navigated to this page, we will have an uni available as a nav param
		this.selectedUni = this.navParams.get('uni');
		console.debug("major-list:ionViewWillEnter() - uni", this.selectedUni);

		const previouslySelectedMajor = this.stateService.getCurrentMajor();
		console.debug('major-list:ionViewWillEnter() - old major', previouslySelectedMajor);

		if (previouslySelectedMajor) {
			console.debug('major-list:ionViewWillEnter() - show units for saved major');
			this.majorSelected(previouslySelectedMajor);
		} else {
			// prevent reloading data from firebase
			if (!this.majors) {
				console.debug('major-list:ionViewWillEnter() - get majors from server');
				this.dbService.getMajors(this.selectedUni).subscribe(majors => {
					this.majors = majors;
					console.debug("major-list:ionViewWillEnter() - majors", this.majors);

					this.noMajorsAvailable = majors.length <= 0;
					console.debug("major-list:ionViewWillEnter() - noMajorsAvailable", this.noMajorsAvailable);
				});
			}
		}
	};

	backToUniList() {
		console.log('major-list:backToUniList()');
		this.stateService.setCurrentUni(null);
	}

	majorSelected(major) {
		console.debug('major-list:majorSelected()', major);
		this.stateService.setCurrentMajor(major);
		this.navCtrl.push(UnitListPage, {
			uni: this.selectedUni,
			major: major,
		});
	};
}
