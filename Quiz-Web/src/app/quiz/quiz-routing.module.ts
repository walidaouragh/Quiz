import { QuizComponent } from "./quiz.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { TestComponent } from "./test/test.component";
import { ResultComponent } from "./result/result.component";
import { CheckComponent } from "./check/check.component";
import { OfflineComponent } from "./offline/offline.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const quizRoutes: Routes = [
    {
        path: '',
        component: QuizComponent,
        children: [
            {
                path: 'home/:userId',
                component: HomeComponent
            },
            {
                path: 'test/:id/:userId',
                component: TestComponent,
                data: { reuse: true }
            },
            {
                path: ':quizId/result',
                component: ResultComponent
            },
            {
                path: ':quizId/check',
                component: CheckComponent
            },
            {
                path: 'offline',
                component: OfflineComponent,
                pathMatch: 'full'
            },
            {
                path: '**',
                component: PageNotFoundComponent,
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
