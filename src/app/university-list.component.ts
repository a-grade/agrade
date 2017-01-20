import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
	selector: 'university-list',
	template: `
		<ul>
			<li
				*ngFor="let university of universities | async"
				(click)="universitySelected(university)">
				<span>{{university.shortName}}</span>
				<span> - </span>
				<span>{{university.name}}</span>
			</li>
		</ul>
	`
})

export class UniversityList {
	universities: FirebaseListObservable<any[]>;
	constructor(af:AngularFire) {
		this.universities = af.database.list('/universities');
	};
	universitySelected(university) {
		console.log(university);
	}
}
