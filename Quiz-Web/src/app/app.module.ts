import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { MaterialModule } from './app.material.module';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './quiz/reuse-strategy';

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [AppComponent],
	imports: [
		CommonModule,
		BrowserModule,
		AuthModule,
		AppRoutingModule,
		MaterialModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient]
			}
		}),
		FlexLayoutModule,
		PerfectScrollbarModule,
		AuthModule
	],
	providers: [TranslateService, { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }],
	entryComponents: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
