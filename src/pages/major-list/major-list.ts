import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Wove } from 'aspect.js';

import { ModuleListPage, UniversityDetailsPage } from '../../pages';

import { University, Major } from '../../models';

import { DatabaseService, StateService, LoadingService } from '../../services';

@Wove()
@Component({
	selector: 'major-list',
	templateUrl: 'major-list.html'
})
export class MajorListPage {
	get university(): University {
		return this.navParams.get('university');
	};

	majors: Major[];

	constructor(
		private dbService: DatabaseService,
		private stateService: StateService,
		private loading: LoadingService,
		private navCtrl: NavController,
		private navParams: NavParams) {
	}

	ionViewWillEnter() {
		this.loading.show();
		const previouslySelectedMajor = this.stateService.getCurrentMajor();

		if (previouslySelectedMajor) {
			this.majorSelected(previouslySelectedMajor);
		} else {
			this.dbService.getMajors(this.university).subscribe(majors => {
				this.majors = majors;
				this.loading.hide();
			});
		}
	};

	backToUniversityList() {
		this.stateService.setCurrentUniversity(null);
	};

	goToUniversityDetails() {
		this.navCtrl.push(UniversityDetailsPage, {
			university : this.university
		});
	};

	majorSelected(major) {
		this.stateService.setCurrentMajor(major);
		this.navCtrl.push(ModuleListPage, {
			university: this.university,
			major: major,
		});
	};
}
