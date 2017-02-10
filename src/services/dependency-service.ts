import { Injectable } from '@angular/core';
import { Wove } from 'aspect.js';

import { Module } from '../models';

import { ModuleStatusService } from '../services';


@Wove({ logOff: true })
@Injectable()
export class DependencyService {

	constructor(
		private moduleStatusService: ModuleStatusService,
	) {
	};

	isBlocked(module: Module) {
		if (module.condition.trim()) {
			// TODO
			return true;
		}

		return false;
	}
}
