import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';

import { DatabaseService, LogAspect, StateService } from '../services';

import { MyApp } from './app.component';
import { UniListPage } from '../pages/uni-list/uni-list';
import { UniDetailsPage } from '../pages/uni-details/uni-details';
import { MajorListPage } from '../pages/major-list/major-list';
import { MajorDetailsPage } from '../pages/major-details/major-details';
import { UnitListPage } from '../pages/unit-list/unit-list';

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
		UniDetailsPage,
		MajorListPage,
		MajorDetailsPage,
		UnitListPage,
	],
	imports: [
		AngularFireModule.initializeApp(firebaseConfig),
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		UniListPage,
		UniDetailsPage,
		MajorListPage,
		MajorDetailsPage,
		UnitListPage,
	],
	providers: [
		LogAspect,
		DatabaseService,
		StateService,
		{
			provide: ErrorHandler,
			useClass: IonicErrorHandler
		}
	]
})
export class AppModule {}
