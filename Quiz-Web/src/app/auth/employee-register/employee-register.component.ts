import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../_services/quiz.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IEmployee } from '../../_types/IEmployee';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-employee-register',
	templateUrl: './employee-register.component.html',
	styleUrls: ['./employee-register.component.scss']
})
export class EmployeeRegisterComponent implements OnInit {
	constructor(private quizService: QuizService, private fb: FormBuilder, private router: Router) {}

	public employeeRegisterForm: FormGroup;
	public errorMessage: string;
	public submitted: boolean = false;

	ngOnInit() {
		this.employeeRegisterForm = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]]
		});
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.employeeRegisterForm.controls;
	}

	public onSubmit(form: FormGroup): void {
		this.submitted = true;
		this.quizService.registerEmployee(form.value).subscribe(
			(employee: IEmployee) => {
				if (form.valid) {
					this.router.navigate([`./quiz/employee-dashboard/${employee.employeeId}`]);
				}
			},
			(error: HttpErrorResponse) => {
				this.errorMessage = error.error;
				console.log(this.errorMessage);
			}
		);
	}
}
