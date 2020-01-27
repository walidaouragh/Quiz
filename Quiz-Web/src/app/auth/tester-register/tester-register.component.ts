import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizService } from '../../_services/quiz.service';
import ISchool = namespace.ISchool;
import { HttpErrorResponse } from '@angular/common/http';
import ITester = namespace.ITester;

@Component({
	selector: 'ms-register-session',
	templateUrl: './tester-register-component.html',
	styleUrls: ['./tester-register-component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TesterRegisterComponent implements OnInit {
	constructor(private quizService: QuizService, private router: Router, private fb: FormBuilder) {}

	public registerForm: FormGroup;
	public errorMessage: string;
	public submitted: boolean = false;
	public schools: ISchool[];

	ngOnInit(): void {
		this.registerForm = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			schoolId: ['', Validators.required]
		});
		this.getSchools();
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.registerForm.controls;
	}

	public onSubmit(form: FormGroup): void {
		this.submitted = true;
		if (form.invalid) return;
		this.quizService.register(form.value).subscribe(
			(tester: ITester) => {
				if (form.valid) {
					this.router.navigate([`./quiz/home/${tester.testerId}/${tester.schoolId}`]);
				}
			},
			(error: HttpErrorResponse) => {
				this.errorMessage = error.error;
				console.log(this.errorMessage);
			}
		);
	}

	public getSchools(): void {
		this.quizService.getSchools().subscribe((schools: ISchool[]) => {
			this.schools = schools;
		});
	}
}
