import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { NavController, NavParams } from 'ionic-angular';
import { MajorListPage } from '../major-list/major-list';
import { Uni } from '../../models/uni';

@Component({
  selector: 'uni-list',
  templateUrl: 'uni-list.html'
})

export class UniListPage {
	unis: FirebaseListObservable<Uni[]>;

	constructor(public af:AngularFire, public navCtrl: NavController, public navParams: NavParams) {
		// If we navigated to this page, we will have an item available as a nav param
		this.unis = af.database.list('/universities');
	}

	uniSelected(event, uni) {
		console.debug('uni-list:uniSelected()', uni);
		this.navCtrl.push(MajorListPage, {
			uni: uni
		});
	}
}
