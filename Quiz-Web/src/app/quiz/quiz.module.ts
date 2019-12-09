import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../app.material.module';
import { QuizRoutingModule } from './quiz-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizComponent } from './quiz.component';
import { QuizService } from '../_services/quiz.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TestComponent } from './test/test.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { ResultComponent } from './result/result.component';
import { CanDeactivateGuard } from '../_services/candeactivateguard.service';
import { CheckComponent } from './check/check.component';
import { AuthModule } from '../auth/auth.module';
import { OfflineComponent } from './offline/offline.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderTitleService } from '../_services/header-title.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EditComponent } from './admin-dashboard/edit/edit.component';
import { EditDialogComponent } from './admin-dashboard/edit-dialog/edit-dialog.component';

@NgModule({
	imports: [
		CommonModule,
		QuizRoutingModule,
		MaterialModule,
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		FormsModule,
		AuthModule
	],
	declarations: [
		QuizComponent,
		HomeComponent,
		NavbarComponent,
		TestComponent,
		ConfirmDialogComponent,
		ResultComponent,
		CheckComponent,
		OfflineComponent,
		PageNotFoundComponent,
		AdminDashboardComponent,
		EditComponent,
		EditDialogComponent
	],
	providers: [QuizService, CanDeactivateGuard, HeaderTitleService],
	entryComponents: [ConfirmDialogComponent, EditDialogComponent]
})
export class QuizModule {}
