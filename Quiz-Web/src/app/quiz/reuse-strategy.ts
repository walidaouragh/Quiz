import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable()
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
	public static handlers: { [key: string]: DetachedRouteHandle } = {};
	private static waitDelete: string;

	public shouldDetach(route: ActivatedRouteSnapshot): boolean {
		return route.data && route.data.reuse;
	}
	public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
		if (CustomRouteReuseStrategy.waitDelete && CustomRouteReuseStrategy.waitDelete === this.getRouteUrl(route)) {
			CustomRouteReuseStrategy.waitDelete = null;
			return;
		}
		CustomRouteReuseStrategy.handlers[this.getRouteUrl(route)] = handle;
	}
	public shouldAttach(route: ActivatedRouteSnapshot): boolean {
		return !!CustomRouteReuseStrategy.handlers[this.getRouteUrl(route)];
	}
	public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
		if (!route.routeConfig) {
			return null;
		}
		return CustomRouteReuseStrategy.handlers[this.getRouteUrl(route)];
	}
	public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
		return future.routeConfig === curr.routeConfig && JSON.stringify(future.params) === JSON.stringify(curr.params);
	}
	private getRouteUrl(route: ActivatedRouteSnapshot): string {
		return route['_routerState'].url.replace(/\//g, '_');
	}
}
