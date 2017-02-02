import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Wove } from 'aspect.js';

import { UnitListPage } from '../unit-list/unit-list';

import { Uni } from '../../models/uni';
import { Major } from '../../models/major';

import { DatabaseService } from '../../services/database-service';
import { StateService } from '../../services/state-service';

@Wove({ debug: true })
@Component({
	selector: 'major-list',
	templateUrl: 'major-list.html'
})
export class MajorListPage {
	get selectedUni(): Uni {
		return this.navParams.get('uni');
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
			this.dbService.getMajors(this.selectedUni).subscribe(majors => {
				this.majors = majors;
			});
		}
	};

	backToUniList() {
		this.stateService.setCurrentUni(null);
	};

	majorSelected(major) {
		this.stateService.setCurrentMajor(major);
		this.navCtrl.push(UnitListPage, {
			uni: this.selectedUni,
			major: major,
		});
	};
}
