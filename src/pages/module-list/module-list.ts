import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Wove } from 'aspect.js';

import { University, Major, Module } from '../../models';

import { MajorDetailsPage, ModuleDetailsPage } from '../../pages'

import { DatabaseService, StateService, LoadingService } from '../../services';

enum ModuleStatus {
	UNBLOCKED = 0,
	DONE = 1,
	BLOCKED = 2,
	RECUPERATION = 3,
};

@Wove({ logOff: true })
@Component({
	selector: 'module-list',
	templateUrl: 'module-list.html'
})

export class ModuleListPage {
	get university(): University {
		return this.navParams.get('university');
	};
	get major(): Major {
		return this.navParams.get('major');
	};
	modules: Module[];
	userStatus = {};

	constructor(
		private dbService: DatabaseService,
		private stateService: StateService,
		private loading: LoadingService,
		private navCtrl: NavController,
		private navParams: NavParams,
	) {
		this.loading.show();

		dbService
			.getModules(this.university, this.major)
			.subscribe(modules => {
				this.modules = modules;
				this.calculateBlocked();
				this.loading.hide();
			});
	};

	private calculateBlocked(): void {
		this.modules.forEach(module => {
			if (module.condition.trim()) {
				this.userStatus[module.$key] = ModuleStatus.BLOCKED;
			}
		});
	}
	backToMajorList() {
		this.stateService.setCurrentMajor(null);
	};
	goToMajorDetails() {
		this.navCtrl.push(MajorDetailsPage, {
			major : this.major
		});
	};
	getColor(module) {
		switch (this.getModuleStatus(module)){
			case ModuleStatus.DONE:
				return 'item-md-primary';
			case ModuleStatus.BLOCKED:
				return 'item-md-danger';
			case ModuleStatus.RECUPERATION:
				return 'item-md-secondary';
			case ModuleStatus.UNBLOCKED:
				return 'item-md-light';
		};

	};
	infoClicked(module, event) {
		event && event.stopPropagation();
		this.navCtrl.push(ModuleDetailsPage, {
			module: module,
		});
	};
	moduleClicked(module): void {
		switch (this.getModuleStatus(module)) {
			case ModuleStatus.DONE:
				this.setModuleStatus(module, ModuleStatus.UNBLOCKED);
				break;
			case ModuleStatus.BLOCKED:
				this.infoClicked(module, null);
				break;
			case ModuleStatus.RECUPERATION:
				this.setModuleStatus(module, ModuleStatus.DONE);
				break;
			case ModuleStatus.UNBLOCKED:
				this.setModuleStatus(module, ModuleStatus.DONE);
				break;
		};
	};
	setModuleStatus(module: Module, status: ModuleStatus): void {
		if (status === ModuleStatus.UNBLOCKED) {
			delete this.userStatus[module.$key];
		} else {
			this.userStatus[module.$key] = status;
		}
	};
	getModuleStatus(module: Module): ModuleStatus {
		const moduleKey = module.$key;
		return this.userStatus[moduleKey] || ModuleStatus.UNBLOCKED;
	};
}
