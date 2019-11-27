import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const authRoutes: Routes = [
	{ path: 'register', component: RegisterComponent, data: { title: 'Register' } },
	{ path: 'login', component: LoginComponent, data: { title: 'Login' } }
];

@NgModule({
	imports: [RouterModule.forChild(authRoutes)],
	exports: [RouterModule],
	providers: []
})
export class AuthRoutingModule {}
