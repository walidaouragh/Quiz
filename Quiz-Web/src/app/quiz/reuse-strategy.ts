import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { Injectable } from '@angular/core';
import { LogoutComponent } from '../auth/logout/logout.component';
@Injectable()
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
	private handlers: { [key: string]: DetachedRouteHandle } = {};
	private static waitDelete: string;

	public shouldDetach(route: ActivatedRouteSnapshot): boolean {
		if (route.component == LogoutComponent) {
			this.handlers = {};

			return false;
		}
	}
	public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
		if (CustomRouteReuseStrategy.waitDelete && CustomRouteReuseStrategy.waitDelete === this.getRouteUrl(route)) {
			CustomRouteReuseStrategy.waitDelete = null;
			return;
		}
		this.handlers[this.getRouteUrl(route)] = handle;
	}
	public shouldAttach(route: ActivatedRouteSnapshot): boolean {
		return !!this.handlers[this.getRouteUrl(route)];
	}
	public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
		if (!route.routeConfig) {
			return null;
		}
		return this.handlers[this.getRouteUrl(route)];
	}
	public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
		return future.routeConfig === curr.routeConfig && JSON.stringify(future.params) === JSON.stringify(curr.params);
	}
	private getRouteUrl(route: ActivatedRouteSnapshot): string {
		return route['_routerState'].url.replace(/\//g, '_');
	}
}
