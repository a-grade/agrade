import { Component } from '@angular/core';
import { UniversityList } from './university-list.component';

@Component({
	selector: 'app-root',
	template: `
		<h1>
			{{title}}
		</h1>
		<university-list></university-list>
	`
})

export class AppComponent {
  title = 'Bem vindo ao Agrade';
}
