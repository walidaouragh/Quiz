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
import { QuestionEditDialogComponent } from './dialogs/question-edit-dialog/question-edit-dialog.component';
import { QuestionAddDialogComponent } from './dialogs/question-add-dialog/question-add-dialog.component';
import { ManageQuizzesComponent } from './manage-quizzes/manage-quizzes.component';
import { QuizAddDialogComponent } from './dialogs/quiz-add-dialog/quiz-add-dialog.component';
import { QuestionComponent } from './admin-dashboard/edit-question/question.component';
import { CapitalizeFirstPipe } from '../Directives/capitalizeFirstLetter.directive';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { TestersTableComponent } from './admin-dashboard/testers-table/testers-table.component';
import { EmployeesTableComponent } from './admin-dashboard/employees-table/employees-table.component';
import { TesterDetailComponent } from "./tester-detail/tester-detail.component";
import { SchoolComponent } from './admin-dashboard/school/school.component';

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
		QuestionComponent,
		QuestionEditDialogComponent,
		QuestionAddDialogComponent,
		ManageQuizzesComponent,
		TesterDetailComponent,
		QuizAddDialogComponent,
		CapitalizeFirstPipe,
		EmployeeDashboardComponent,
		TestersTableComponent,
		EmployeesTableComponent,
		SchoolComponent
	],
	providers: [QuizService, CanDeactivateGuard, HeaderTitleService],
	entryComponents: [
		ConfirmDialogComponent,
		QuestionEditDialogComponent,
		QuestionAddDialogComponent,
		QuizAddDialogComponent
	],
	exports: [CapitalizeFirstPipe]
})
export class QuizModule {}
