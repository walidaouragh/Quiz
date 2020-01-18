import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TesterRegisterComponent } from './tester-register/tester-register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
	imports: [CommonModule, ReactiveFormsModule, MaterialModule, AuthRoutingModule, FlexLayoutModule, FormsModule],
	declarations: [TesterRegisterComponent, LoginComponent],
	providers: []
})
export class AuthModule {}
