import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TesterRegisterComponent } from './tester-register/tester-register.component';
import { LoginComponent } from './login/login.component';
import { EmployeeRegisterComponent } from "./employee-register/employee-register.component";
import { LogoutComponent } from "./logout/logout.component";

export const authRoutes: Routes = [
	{ path: 'tester-register', component: TesterRegisterComponent, data: { title: 'Tester-Register' } },
	{ path: 'employee-register', component: EmployeeRegisterComponent, data: { title: 'Employee-Register' } },
	{ path: 'login', component: LoginComponent, data: { title: 'Login' } },
	{ path: 'logout', component: LogoutComponent, data: { title: 'Logout' } }
];

@NgModule({
	imports: [RouterModule.forChild(authRoutes)],
	exports: [RouterModule],
	providers: []
})
export class AuthRoutingModule {}
