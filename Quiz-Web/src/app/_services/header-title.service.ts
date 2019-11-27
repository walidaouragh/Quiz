import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class HeaderTitleService {
	constructor(private titleService: Title) {}

	public headerTitle: string = 'Quiz';

	public getTitle(route: ActivatedRoute): Observable<string> {
		return of(route).pipe(
			map(() => {
				let child: ActivatedRoute = route.firstChild;
				while (child) {
					if (child.firstChild) {
						child = child.firstChild;
					} else if (child.snapshot.data && child.snapshot.data.title) {
						return `${this.headerTitle} - ${child.snapshot.data.title}`;
					} else {
						return this.headerTitle;
					}
				}
			})
		);
	}

	public setTitle(title: string): void {
		this.titleService.setTitle(title);
	}
}
