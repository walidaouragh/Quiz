import { QuizComponent } from './quiz.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { ResultComponent } from './result/result.component';
import { CheckComponent } from './check/check.component';
import { OfflineComponent } from './offline/offline.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const quizRoutes: Routes = [
	{
		path: '',
		component: QuizComponent,
		children: [
			{
				path: 'home/:userId',
				component: HomeComponent,
				data: {
					title: 'Home'
				}
			},
			{
				path: 'test/:id/:userId',
				component: TestComponent,
				data: { reuse: true, title: 'Test' }
			},
			{
				path: ':quizId/result',
				component: ResultComponent,
				data: {
					title: 'Result'
				}
			},
			{
				path: ':quizId/check',
				component: CheckComponent,
				data: {
					title: 'Check'
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
