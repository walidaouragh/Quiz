import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'register',
        pathMatch: 'full'
    },
    {
        path: 'quiz',
        data: { reuse: true },
        loadChildren: './quiz/quiz.module#QuizModule'
    }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {}