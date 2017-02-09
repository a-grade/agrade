import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';

import { DatabaseService, LogAspect, StateService, LoadingService } from '../services';

import { MyApp } from './app.component';
import { UniversityListPage, UniversityDetailsPage, MajorListPage, MajorDetailsPage, ModuleListPage, ModuleDetailsPage } from '../pages';

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
		UniversityListPage,
		UniversityDetailsPage,
		MajorListPage,
		MajorDetailsPage,
		ModuleListPage,
		ModuleDetailsPage,
	],
	imports: [
		AngularFireModule.initializeApp(firebaseConfig),
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		UniversityListPage,
		UniversityDetailsPage,
		MajorListPage,
		MajorDetailsPage,
		ModuleListPage,
		ModuleDetailsPage,
	],
	providers: [
		LogAspect,
		DatabaseService,
		StateService,
		LoadingService,
		{
			provide: ErrorHandler,
			useClass: IonicErrorHandler
		}
	]
})
export class AppModule {}
