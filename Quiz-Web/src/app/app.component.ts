import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeaderTitleService } from './_services/header-title.service';
import { filter, mergeMap, take } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
	constructor(
		public translate: TranslateService,
		private router: Router,
		private headerTitleService: HeaderTitleService,
		private activatedRoute: ActivatedRoute
	) {
		translate.addLangs(['en', 'fr']);
		translate.setDefaultLang('en');

		const browserLang: string = translate.getBrowserLang();
		translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
	}

	ngOnInit() {
		this.headerTitleService
			.getTitle(this.activatedRoute)
			.pipe(take(1))
			.subscribe((title: string) => {
				this.headerTitleService.setTitle(title);
			});

		this.router.events
			.pipe(
				filter((event: RouterEvent) => {
					return event instanceof NavigationEnd;
				}),
				mergeMap(() => this.headerTitleService.getTitle(this.activatedRoute))
			)
			.subscribe((title: string) => {
				this.headerTitleService.setTitle(title);
			});
	}
}
