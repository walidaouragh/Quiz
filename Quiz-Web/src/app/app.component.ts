import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-root',
	template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
	constructor(public translate: TranslateService, private router: Router, private titleService: Title) {
		translate.addLangs(['en', 'fr']);
		translate.setDefaultLang('en');

		const browserLang: string = translate.getBrowserLang();
		translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
	}

	ngOnInit() {
		this.titleService.setTitle('Quiz');
	}
}
