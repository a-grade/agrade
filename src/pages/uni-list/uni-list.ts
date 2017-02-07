import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Wove } from 'aspect.js';

import { MajorListPage } from '../major-list/major-list';
import { Uni } from '../../models';

import { DatabaseService, StateService } from '../../services';

@Wove({ level: 'log', logOff: true })
@Component({
	selector: 'uni-list',
	templateUrl: 'uni-list.html'
})
export class UniListPage {
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
