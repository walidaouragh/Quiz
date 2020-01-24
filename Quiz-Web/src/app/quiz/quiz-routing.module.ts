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
import { TesterDetailComponent } from "./tester-detail/tester-detail.component";

const quizRoutes: Routes = [
	{
		path: '',
		component: QuizComponent,
		children: [
			{
				path: 'home/:testerId',
				component: HomeComponent,
				data: {
					title: 'Home'
				}
			},
			{
				path: 'test/:id/:testerId/:quizName',
				component: TestComponent,
				data: { reuse: true, title: 'Test' }
			},
			{
				path: ':quizId/result/:testerId',
				component: ResultComponent,
				data: {
					title: 'Result'
				}
			},
			{
				path: ':quizId/check/:testerId',
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
				path: 'admin-dashboard/manage/:id',
				component: QuestionComponent,
				data: {
					title: 'Admin'
				}
			},
			{
				path: 'admin-dashboard/manage',
				component: ManageQuizzesComponent,
				data: {
					title: 'Manage'
				}
			},
			{
				path: 'admin-dashboard/tester-detail/:testerId',
				component: TesterDetailComponent,
				data: {
					title: 'Manage'
				}
			},
			{
				path: 'employee-dashboard',
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
