import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MajorListPage } from '../major-list/major-list';
import { Uni } from '../../models/uni';

import { DatabaseService } from '../../services/database-service';
import { StateService } from '../../services/state-service';

@Component({
	selector: 'uni-list',
	templateUrl: 'uni-list.html'
})

export class UniListPage {
	unis: Uni[];

	constructor(private dbService: DatabaseService, private stateService: StateService, public navCtrl: NavController, public navParams: NavParams) {
		console.debug('uni-list:constructor()');
	}

	ionViewWillEnter() {
		console.debug('uni-list:ionViewWillEnter()');

		const previouslySelectedUni = this.stateService.getCurrentUni();
		console.debug('uni-list:ionViewWillEnter() - old uni', previouslySelectedUni);

		if (previouslySelectedUni) {
			console.debug('uni-list:ionViewWillEnter() - show majors for saved uni');
			this.uniSelected(previouslySelectedUni);
		} else {
			// prevent reloading data from firebase
			if (!this.unis) {
				console.debug('uni-list:ionViewWillEnter() - get unis from server');
				this.dbService.getUnis().subscribe(
					unis => this.unis = unis
				);
			}
		}
	}

	uniSelected(uni) {
		console.debug('uni-list:uniSelected()', uni);
		this.stateService.setCurrentUni(uni);
		this.navCtrl.push(MajorListPage, {
			uni: uni,
		});
	}
}
