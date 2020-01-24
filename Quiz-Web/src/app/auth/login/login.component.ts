import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { QuizService } from '../../_services/quiz.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IEmployeeAuthRequest, IQuizAuthResponse } from '../../_types/IQuizAuthResponse';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'ms-login-session',
	templateUrl: './login-component.html',
	styleUrls: ['./login-component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
	constructor(private quizService: QuizService, private router: Router, private fb: FormBuilder) {}

	public employeeLoginForm: FormGroup;
	public errorMessage: string;
	public employee: IEmployeeAuthRequest;
	public submitted: boolean = false;

	ngOnInit(): void {
		this.employeeLoginForm = this.fb.group({
			employeeEmail: ['', [Validators.required, Validators.email]],
			employeePassword: ['', Validators.required]
		});
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.employeeLoginForm.controls;
	}

	public login(): void {
		this.submitted = true;
		this.employee = Object.assign({}, this.employeeLoginForm.value);
		localStorage.removeItem('DATA');
		localStorage.removeItem('user');

		this.quizService.LoginEmployee(this.employee).subscribe(
			(DATA: IQuizAuthResponse) => {
				if (DATA && DATA.success) {
					localStorage.setItem('user', JSON.stringify(this.employee));
					localStorage.setItem('DATA', JSON.stringify(DATA));
					if (DATA.isAdmin) {
						this.router.navigate(['./quiz/admin-dashboard']);
					} else {
						this.router.navigate([`./quiz/employee-dashboard`]);
					}
				}
			},
			(error: HttpErrorResponse) => {
				this.errorMessage = error.error;
				console.log(this.errorMessage);
			}
		);
	}
}
