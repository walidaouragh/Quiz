import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import User = namespace.User;
import { QuizService } from '../../_services/quiz.service';

@Component({
	selector: 'ms-register-session',
	templateUrl: './register-component.html',
	styleUrls: ['./register-component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
	constructor(private quizService: QuizService, private router: Router, private fb: FormBuilder) {}

	public registerForm: FormGroup;
	public errorMessage: string;
	public submitted: boolean = false;

	ngOnInit(): void {
		this.registerForm = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]]
		});
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.registerForm.controls;
	}

	public onSubmit(form: FormGroup): void {
		this.submitted = true;
		this.quizService.register(form.value).subscribe(
			(user: User) => {
				if (form.valid) {
					this.router.navigate([`./quiz/home/${user.userId}`]);
				}
			},
			(error: HttpErrorResponse) => {
				this.errorMessage = error.error;
				console.log(this.errorMessage);
			}
		);
	}
}
