import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Wove } from 'aspect.js';

import { University, Major, Module, ModuleStatus } from '../../models';

import { MajorDetailsPage, ModuleDetailsPage } from '../../pages'

import { DatabaseService, StateService, LoadingService, DependencyService, ModuleStatusService } from '../../services';

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

	constructor(
		private dbService: DatabaseService,
		private stateService: StateService,
		private loading: LoadingService,
		private moduleStatusService: ModuleStatusService,
		private dependencyService: DependencyService,
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
			if (this.dependencyService.isBlocked(module)) {
				this.moduleStatusService.set(module, ModuleStatus.BLOCKED);
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
		switch (this.moduleStatusService.get(module)){
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
		switch (this.moduleStatusService.get(module)) {
			case ModuleStatus.DONE:
				this.moduleStatusService.set(module, ModuleStatus.UNBLOCKED);
				break;
			case ModuleStatus.BLOCKED:
				this.infoClicked(module, null);
				break;
			case ModuleStatus.RECUPERATION:
				this.moduleStatusService.set(module, ModuleStatus.DONE);
				break;
			case ModuleStatus.UNBLOCKED:
				this.moduleStatusService.set(module, ModuleStatus.DONE);
				break;
		};
	};
};
