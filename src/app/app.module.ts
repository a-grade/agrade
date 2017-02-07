import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';

import { DatabaseService, LogAspect, StateService } from '../services';

import { MyApp } from './app.component';
import { UniListPage, UniDetailsPage, MajorListPage, MajorDetailsPage, ModuleListPage } from '../pages';

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
		ModuleListPage,
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
		ModuleListPage,
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
