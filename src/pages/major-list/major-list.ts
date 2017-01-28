import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Component({
	selector: 'major-list',
	templateUrl: 'major-list.html'
})
export class MajorListPage {
	selectedUni: any;
	noMajorsAvailable: boolean = false;
	majors: FirebaseListObservable<any[]>;

	constructor(public af:AngularFire, public navCtrl: NavController, public navParams: NavParams) {
		console.debug("major-list:constructor()");
		// If we navigated to this page, we will have an item available as a nav param
		this.selectedUni = navParams.get('uni');
		console.debug("major-list:constructor() - uni", this.selectedUni);
		this.majors = af.database.list(`/universities/${this.selectedUni.$key}/majors`);
		console.debug("major-list:constructor() - majors", this.majors);
		this.majors.subscribe(majors => this.noMajorsAvailable = majors.length <= 0)
	}

	majorSelected(event, major) {
		console.debug('major-list:majorSelected()', major);
	};
}
