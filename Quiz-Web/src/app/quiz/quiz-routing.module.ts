import { QuizComponent } from "./quiz.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { TestComponent } from "./test/test.component";
import { ResultComponent } from "./result/result.component";
import { CheckComponent } from "./check/check.component";

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
            },
            {
                path: ':quizId/result',
                component: ResultComponent
            },
            {
                path: ':quizId/check',
                component: CheckComponent
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
