import { Injectable } from '@angular/core';
import { Wove } from 'aspect.js';

import { Module, ModuleStatus } from '../models';

@Wove({ logOff: true })
@Injectable()
export class ModuleStatusService {
	userStatus = {};

	set(module: Module, status: ModuleStatus): void {
		if (status === ModuleStatus.UNBLOCKED) {
			delete this.userStatus[module.$key];
		} else {
			this.userStatus[module.$key] = status;
		}
		// TODO trigger a dependency calculation
	};
	get(module: Module): ModuleStatus {
		const moduleKey = module.$key;
		return this.userStatus[moduleKey] || ModuleStatus.UNBLOCKED;
	};
}
