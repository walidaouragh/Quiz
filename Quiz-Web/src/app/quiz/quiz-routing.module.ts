import { QuizComponent } from './quiz.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { ResultComponent } from './result/result.component';
import { CheckComponent } from './check/check.component';
import { OfflineComponent } from './offline/offline.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageQuizzesComponent } from './manage-quizzes/manage-quizzes.component';
import { QuestionComponent } from './admin-dashboard/edit-question/question.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { TesterDetailComponent } from './tester-detail/tester-detail.component';
import { SchoolComponent } from './admin-dashboard/school/school.component';

const quizRoutes: Routes = [
	{
		path: '',
		component: QuizComponent,
		children: [
			{
				path: 'home/:testerId/:schoolId',
				component: HomeComponent,
				data: {
					title: 'Home'
				}
			},
			{
				path: 'test/:schoolId/:id/:testerId/:quizName',
				component: TestComponent,
				data: { reuse: true, title: 'Test' }
			},
			{
				path: ':schoolId/:quizId/result/:testerId',
				component: ResultComponent,
				data: {
					title: 'Result'
				}
			},
			{
				path: ':schoolId/:quizId/check/:testerId',
				component: CheckComponent,
				data: {
					title: 'Check'
				}
			},
			{
				path: 'admin-dashboard',
				component: AdminDashboardComponent,
				data: {
					reuse: true,
					title: 'Admin'
				}
			},
			{
				path: 'admin-dashboard/:schoolId',
				component: SchoolComponent,
				data: {
					reuse: true,
					title: 'Admin'
				}
			},
			{
				path: 'admin-dashboard/manage/:schoolId/:id',
				component: QuestionComponent,
				data: {
					title: 'Admin'
				}
			},
			{
				path: 'admin-dashboard/manage/:schoolId',
				component: ManageQuizzesComponent,
				data: {
					title: 'Manage'
				}
			},
			{
				path: 'admin-dashboard/tester-detail/:schoolId/:testerId',
				component: TesterDetailComponent,
				data: {
					title: 'Manage'
				}
			},
			{
				path: 'employee-dashboard/:schoolId',
				component: EmployeeDashboardComponent,
				data: {
					title: 'employee-dashboard'
				}
			},
			{
				path: 'offline',
				component: OfflineComponent,
				data: {
					title: 'Offline'
				},
				pathMatch: 'full'
			},
			{
				path: '**',
				component: PageNotFoundComponent
			}
		]
	}
];

export { quizRoutes };

@NgModule({
	imports: [RouterModule.forChild(quizRoutes)],
	exports: [RouterModule]
})
export class QuizRoutingModule {}
