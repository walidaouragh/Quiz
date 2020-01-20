import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { QuizService } from '../../_services/quiz.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAdminAuthRequest, IQuizAuthResponse } from '../../_types/IQuizAuthResponse';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'ms-login-session',
	templateUrl: './login-component.html',
	styleUrls: ['./login-component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
	constructor(private quizService: QuizService, private router: Router, private fb: FormBuilder) {}

	public adminLoginForm: FormGroup;
	public errorMessage: string;
	public admin: IAdminAuthRequest;
	public submitted: boolean = false;

	ngOnInit(): void {
		this.adminLoginForm = this.fb.group({
			employeeEmail: ['', [Validators.required, Validators.email]],
			employeePassword: ['', Validators.required]
		});
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.adminLoginForm.controls;
	}

	public onSubmit(): void {
		this.submitted = true;
		this.admin = Object.assign({}, this.adminLoginForm.value);

		this.quizService.LoginAdmin(this.admin).subscribe(
			(DATA: IQuizAuthResponse) => {
				localStorage.setItem('admin', JSON.stringify(this.admin));
				localStorage.setItem('DATA', JSON.stringify(DATA));
				this.router.navigate(['./quiz/admin-dashboard']);
			},
			(error: HttpErrorResponse) => {
				this.errorMessage = error.error;
				console.log(this.errorMessage);
			}
		);
	}
}
