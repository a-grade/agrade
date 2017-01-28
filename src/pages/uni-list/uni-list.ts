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

		const previouslySelectedUni = stateService.getCurrentUni();
		console.debug('uni-list:constructor() - old uni', previouslySelectedUni);

		if (previouslySelectedUni) {
			console.debug('uni-list:constructor() - show majors for saved uni');
			this.uniSelected(previouslySelectedUni);
		} else {
			console.debug('uni-list:constructor() - get unis from server');
			dbService.getUnis().subscribe(
				unis => this.unis = unis
			);
		}
	}

	uniSelected(uni) {
		console.debug('uni-list:uniSelected()', uni);
		this.navCtrl.push(MajorListPage, {
			uni: uni,
		});
	}
}
