import { Component } from '@angular/core';
import { AngularFire, AngularFireDatabase, FirebaseListObservable } from 'angularfire2';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

export class University {
	$key: string;
	name: string;
	shortName: string;
	icon: string;
	constructor(key: string) {
		this.$key = key;
	};
}

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
	selectedItem: any;
	icons: string[];
	items: FirebaseListObservable<University[]>;

	constructor(public af:AngularFire, public navCtrl: NavController, public navParams: NavParams) {
		// If we navigated to this page, we will have an item available as a nav param
		this.selectedItem = navParams.get('item');
		this.items = af.database.list('/universities');

		this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
		'american-football', 'boat', 'bluetooth', 'build'];

		this.items.subscribe(
			unis => unis.forEach(
				uni => uni.icon = this.icons[Math.floor(Math.random() * this.icons.length)]
			)
		);
	}

	itemTapped(event, item) {
		this.navCtrl.push(ItemDetailsPage, {
			item: item
		});
	}
}
