import { Injectable } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';
import { Wove } from 'aspect.js';

@Wove()
@Injectable()
export class LoadingService {

	private loadingObject: Loading;

	constructor(private loadingCtrl: LoadingController) {

	}

	show() {
		if (!this.loadingObject) {
			this.loadingObject = this.loadingCtrl.create({
				spinner: 'bubbles',
				content: 'Please wait ...',
			});
			this.loadingObject.present();
		}
	};
	hide() {
		if (this.loadingObject) {
			this.loadingObject.dismiss();
			this.loadingObject = null;
		}
	};
}
