import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Wove } from 'aspect.js';

import { MajorListPage } from '../../pages';
import { University } from '../../models';

import { DatabaseService, StateService } from '../../services';

@Wove({ level: 'log', logOff: true })
@Component({
	selector: 'university-list',
	templateUrl: 'university-list.html'
})
export class UniversityListPage {
	universities: University[];

	constructor(
		private dbService: DatabaseService,
		private stateService: StateService,
		private navCtrl: NavController,
		private navParams: NavParams) {
	};

	ionViewWillEnter() {
		const previouslySelectedUniversity = this.stateService.getCurrentUniversity();

		if (previouslySelectedUniversity) {
			this.universitySelected(previouslySelectedUniversity);
		} else {
			this.dbService.getUniversities().subscribe(universities => {
				this.universities = universities
			});
		}
	};

	universitySelected(university) {
		this.stateService.setCurrentUniversity(university);
		this.navCtrl.push(MajorListPage, {
			university: university,
		});
	};
}
