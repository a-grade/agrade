import { Injectable } from '@angular/core';
import {beforeMethod, afterMethod, beforeStaticMethod, afterStaticMethod, beforeSetter, afterSetter, beforeGetter, afterGetter, Metadata} from 'aspect.js';

@Injectable()
export class LogAspect {

	get loggingOn(): boolean {
		return true;
	};
	shouldLog(woveMetadata = { logOff: false }): boolean {
		return (this.loggingOn && (woveMetadata && !woveMetadata.logOff));
	};
	logAtLevel(woveMetadata = { level: 'debug' }): any {
		return console[woveMetadata.level ? woveMetadata.level : 'debug'];
	};
	logWith(meta: Metadata, first: any, second: any[]) {
		if (this.shouldLog(meta.woveMetadata)) {
			this.logAtLevel(meta.woveMetadata)(first, ...second);
		}
	}

	before(meta: Metadata): void {
		this.logWith(
			meta,
			`${meta.className}.${meta.method.name}() called ${meta.method.args.length ? 'with:' : '' }`,
			meta.method.args,
		);
	}
	after(meta: Metadata): void {
		this.logWith(
			meta,
			`${meta.className}.${meta.method.name}() returned ${meta.method.result ? 'with:' : '' }`,
			meta.method.result ? meta.method.result : '',
		);
	}

	@beforeMethod({ classNamePattern: /.*/, methodNamePattern: /.*/ })
	beforeMethod(meta: Metadata) {
		this.before(meta);
	};
	@beforeStaticMethod({ classNamePattern: /.*/, methodNamePattern: /.*/ })
	beforeStaticMethod(meta: Metadata) {
		this.before(meta);
	};
	@beforeSetter({ classNamePattern: /.*/, fieldNamePattern: /.*/ })
	beforeSetter(meta: Metadata) {
		this.before(meta);
	};
	@beforeGetter({ classNamePattern: /.*/, fieldNamePattern: /.*/ })
	beforeGetter(meta: Metadata) {
		this.before(meta);
	};

	@afterMethod({ classNamePattern: /.*/, methodNamePattern: /.*/ })
	afterMethod(meta: Metadata) {
		this.after(meta);
	};
	@afterStaticMethod({ classNamePattern: /.*/, methodNamePattern: /.*/ })
	afterStaticMethod(meta: Metadata) {
		this.after(meta);
	};
	@afterSetter({ classNamePattern: /.*/, fieldNamePattern: /.*/ })
	afterSetter(meta: Metadata) {
		this.after(meta);
	};
	@afterGetter({ classNamePattern: /.*/, fieldNamePattern: /.*/ })
	afterGetter(meta: Metadata) {
		this.after(meta);
	};
};
