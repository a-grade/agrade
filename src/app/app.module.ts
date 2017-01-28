import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';

import { MyApp } from './app.component';
import { UniListPage } from '../pages/uni-list/uni-list';
import { MajorListPage } from '../pages/major-list/major-list';

export const firebaseConfig = {
	apiKey: "AIzaSyAlVm4IpLpPtc7vgA2apIRT4n7LgCFkysQ",
	authDomain: "agrade-6ce46.firebaseapp.com",
	databaseURL: "https://agrade-6ce46.firebaseio.com",
	storageBucket: "agrade-6ce46.appspot.com",
	messagingSenderId: "516270411915"
};

@NgModule({
	declarations: [
		MyApp,
		UniListPage,
		MajorListPage,
	],
	imports: [
		AngularFireModule.initializeApp(firebaseConfig),
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		UniListPage,
		MajorListPage,
	],
	providers: [
		{
			provide: ErrorHandler,
			useClass: IonicErrorHandler
		}
	]
})
export class AppModule {}
