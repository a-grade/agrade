import { Component } from '@angular/core';
import { UniversityList } from './university-list.component';

@Component({
	selector: 'app-root',
	template: `
		<md-toolbar color="primary">
			{{title}}
		</md-toolbar>
		<university-list></university-list>
	`
})

export class AppComponent {
  title = 'Agrade';
}
