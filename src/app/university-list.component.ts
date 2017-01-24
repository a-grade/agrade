import { Component } from '@angular/core';
import { AngularFire, AngularFireDatabase, FirebaseListObservable } from 'angularfire2';

export class University {
	$key: string;
	name: string;
	shortName: string;
	constructor(key: string) {
		this.$key = key;
	};
}

export class Major {
	$key: string;
	name: string;
	shortName: string;
	constructor(key: string) {
		this.$key = key;
	};
}

@Component({
	selector: 'university-list',
	template: `
		<md-card>
			<md-nav-list>
				<md-list-item
						*ngFor="let university of universities | async"
						[class.selected-university]="university.$key === selectedUniversity.$key"
						(click)="universitySelected(university)">
					<h3 md-line>
						{{university.shortName}}
					</h3>
					<p md-line>
						{{university.name}}
					</p>
				</md-list-item>
			</md-nav-list>
		</md-card>
		<md-card>
			<md-nav-list>
				<md-list-item
						*ngFor="let major of majors | async"
						(click)="majorSelected(major)">
					<h3 md-line>
						{{major.shortName}}
					</h3>
					<p md-line>
						{{major.name}}
					</p>
				</md-list-item>
			</md-nav-list>
		</md-card>
	`
})

export class UniversityList {
	selectedUniversity:University;
	universities: FirebaseListObservable<University[]>;
	majors: FirebaseListObservable<Major[]>;
	database: AngularFireDatabase;
	constructor(af:AngularFire) {
		this.database = af.database;
		this.universities = af.database.list('/universities');

		const defaultUniversity = new University('ufscar');
		this.universitySelected(defaultUniversity);
	};
	universitySelected(university:University) {
		console.log(university);
		this.selectedUniversity = university;
		this.majors = this.database.list(`/universities/${this.selectedUniversity.$key}/majors`);
	};
	majorSelected(major) {
		console.log(major);
		// this.selectedMajor = major;
	};
}
