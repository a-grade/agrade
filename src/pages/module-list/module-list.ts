import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Wove } from 'aspect.js';

import { Uni, Major, Module } from '../../models';

import { MajorDetailsPage } from '../../pages'

import { DatabaseService, StateService } from '../../services';

@Wove()
@Component({
	selector: 'module-list',
	templateUrl: 'module-list.html'
})

export class ModuleListPage {
	get selectedUni(): Uni {
		return this.navParams.get('uni');
	};
	get selectedMajor(): Major {
		return this.navParams.get('major');
	};
	modules: Module[];

	constructor(
		private dbService: DatabaseService,
		private stateService: StateService,
		private navCtrl: NavController,
		private navParams: NavParams,
	) {
		dbService
			.getModules(this.selectedUni, this.selectedMajor)
			.subscribe(modules => this.modules = modules );
	}

	backToMajorList() {
		this.stateService.setCurrentMajor(null);
	}

	goToMajorDetails() {
		this.navCtrl.push(MajorDetailsPage, {
			major : this.selectedMajor
		});
	}

	moduleLocked(module) {
		return module.checked;
	}

	moduleSelected(module) {
		this.modules.forEach(module => {});
	}

	moduleToggleCheck(module) {
		module.checked = !module.checked;
	}
}
