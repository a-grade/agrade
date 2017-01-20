import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { UniversityList } from './university-list.component';
import { AppComponent } from './app.component';

export const firebaseConfig = {
	apiKey: "AIzaSyAlVm4IpLpPtc7vgA2apIRT4n7LgCFkysQ",
	authDomain: "agrade-6ce46.firebaseapp.com",
	databaseURL: "https://agrade-6ce46.firebaseio.com",
	storageBucket: "agrade-6ce46.appspot.com",
	messagingSenderId: "516270411915"
 };

@NgModule({
	declarations: [
		UniversityList,
		AppComponent
	],
	imports: [
		AngularFireModule.initializeApp(firebaseConfig),
		BrowserModule,
		FormsModule,
		HttpModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
