import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";

export const authRoutes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule],
    providers: []
})

export class AuthRoutingModule {}