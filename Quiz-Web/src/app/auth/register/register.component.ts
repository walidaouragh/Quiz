import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
	constructor(private quizService: QuizService, private router: Router) {}

	public registerForm: FormGroup;
	public errorMessage: string;

	ngOnInit(): void {
		this.registerForm = new FormGroup({
			firstName: new FormControl('', Validators.required),
			lastName: new FormControl('', Validators.required),
			email: new FormControl('', [Validators.email, Validators.required])
		});
	}

	public onSubmit(form: FormGroup): void {
		this.quizService.register(form.value).subscribe(
			(user: User) => {
				this.router.navigate([`./quiz/home/${user.userId}`]);
			},
			(error: HttpErrorResponse) => {
				this.errorMessage = error.error;
				console.log(this.errorMessage);
			}
		);
	}
}
