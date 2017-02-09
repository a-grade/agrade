import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Wove } from 'aspect.js';

import { MajorListPage } from '../../pages';
import { University } from '../../models';

import { DatabaseService, StateService, LoadingService } from '../../services';

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
		private loading: LoadingService,
		private navCtrl: NavController,
		private navParams: NavParams) {
	};

	ionViewWillEnter() {
		this.loading.show();
		const previouslySelectedUniversity = this.stateService.getCurrentUniversity();

		if (previouslySelectedUniversity) {
			this.universitySelected(previouslySelectedUniversity);
		} else {
			this.dbService.getUniversities().subscribe(universities => {
				this.universities = universities;
				this.loading.hide();
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
