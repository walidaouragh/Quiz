import { QuizComponent } from "./quiz.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { TestComponent } from "./test/test.component";
import { ResultComponent } from "./result/result.component";

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
                component: TestComponent
            },
            {
                path: 'result',
                component: ResultComponent
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
