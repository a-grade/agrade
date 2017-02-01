import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Wove } from 'aspect.js';

import { MajorListPage } from '../major-list/major-list';
import { Uni } from '../../models/uni';

import { DatabaseService } from '../../services/database-service';
import { StateService } from '../../services/state-service';

@Wove({ debug: true })
@Component({
	selector: 'uni-list',
	templateUrl: 'uni-list.html'
})
export class UniListPage {
	loading: boolean = true;
	unis: Uni[];

	constructor(
		private dbService: DatabaseService,
		private stateService: StateService,
		private navCtrl: NavController,
		private navParams: NavParams) {
	};

	ionViewWillEnter() {
		const previouslySelectedUni = this.stateService.getCurrentUni();

		if (previouslySelectedUni) {
			this.uniSelected(previouslySelectedUni);
		} else {
			this.dbService.getUnis().subscribe(unis => {
				this.unis = unis
				this.loading = false;
			});
		}
	};

	uniSelected(uni) {
		this.stateService.setCurrentUni(uni);
		this.navCtrl.push(MajorListPage, {
			uni: uni,
		});
	};
}
