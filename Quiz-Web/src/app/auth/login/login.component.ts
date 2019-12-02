import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { QuizService } from '../../_services/quiz.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
	constructor(private quizService: QuizService, private router: Router) {}

	public adminLoginForm: FormGroup;
	public errorMessage: string;
	public admin: IAdminAuthRequest;

	ngOnInit(): void {
		this.adminLoginForm = new FormGroup({
			adminEmail: new FormControl('', [Validators.email, Validators.required]),
			adminPassword: new FormControl('', Validators.required)
		});
	}

	public onSubmit(): void {
		this.admin = Object.assign({}, this.adminLoginForm.value);

		this.quizService.LoginAdmin(this.admin).subscribe(
			(DATA: IQuizAuthResponse) => {
				localStorage.setItem('admin', JSON.stringify(this.admin));
				this.router.navigate(['./quiz/admin-dashboard']);
			},
			(error: HttpErrorResponse) => {
				this.errorMessage = error.error;
				console.log(this.errorMessage);
			}
		);
	}
}
