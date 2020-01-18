import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TesterRegisterComponent } from './tester-register/tester-register.component';
import { LoginComponent } from './login/login.component';

export const authRoutes: Routes = [
	{ path: 'tester-register', component: TesterRegisterComponent, data: { title: 'Tester-Register' } },
	{ path: 'login', component: LoginComponent, data: { title: 'Login' } }
];

@NgModule({
	imports: [RouterModule.forChild(authRoutes)],
	exports: [RouterModule],
	providers: []
})
export class AuthRoutingModule {}
