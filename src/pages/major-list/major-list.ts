import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Wove } from 'aspect.js';

import { ModuleListPage, UniversityDetailsPage } from '../../pages';

import { University, Major } from '../../models';

import { DatabaseService, StateService } from '../../services';

@Wove()
@Component({
	selector: 'major-list',
	templateUrl: 'major-list.html'
})
export class MajorListPage {
	get selectedUniversity(): University {
		return this.navParams.get('university');
	};

	majors: Major[];

	constructor(
		private dbService: DatabaseService,
		private stateService: StateService,
		private navCtrl: NavController,
		private navParams: NavParams) {
	}

	ionViewWillEnter() {
		const previouslySelectedMajor = this.stateService.getCurrentMajor();

		if (previouslySelectedMajor) {
			this.majorSelected(previouslySelectedMajor);
		} else {
			this.dbService.getMajors(this.selectedUniversity).subscribe(majors => {
				this.majors = majors;
			});
		}
	};

	backToUniversityList() {
		this.stateService.setCurrentUniversity(null);
	};

	goToUniversityDetails() {
		this.navCtrl.push(UniversityDetailsPage, {
			university : this.selectedUniversity
		});
	};

	majorSelected(major) {
		this.stateService.setCurrentMajor(major);
		this.navCtrl.push(ModuleListPage, {
			university: this.selectedUniversity,
			major: major,
		});
	};
}
