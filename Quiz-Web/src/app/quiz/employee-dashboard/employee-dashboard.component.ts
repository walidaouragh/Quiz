import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { QuizService } from '../../_services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployeeAdmin } from '../../_types/IEmployee';
import ITester = namespace.ITester;
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-employee-dashboard',
	templateUrl: './employee-dashboard.component.html',
	styleUrls: ['./employee-dashboard.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class EmployeeDashboardComponent implements OnInit {
	constructor(private quizService: QuizService, private router: Router, private route: ActivatedRoute) {}

	public testers: ITester[];
	public employees: IEmployeeAdmin[];
	public isLoadingResults: boolean;
	public schoolId: number;

	ngOnInit() {
		this.schoolId = +this.route.snapshot.paramMap.get('schoolId');
		this.getEmployees();
		this.getTesters();
	}

	public getTesters(): void {
		this.isLoadingResults = true;

		this.quizService.getTesters(this.schoolId).subscribe(
			(users: ITester[]) => {
				this.testers = users;
				this.isLoadingResults = false;
			},
			(error: HttpErrorResponse) => {
				this.isLoadingResults = false;
				console.log(error);
			}
		);
	}

	public getEmployees(): void {
		this.isLoadingResults = true;

		this.quizService.getEmployees(this.schoolId).subscribe(
			(employees: IEmployeeAdmin[]) => {
				this.employees = employees;
				this.isLoadingResults = false;
			},
			(error: HttpErrorResponse) => {
				this.isLoadingResults = false;
				console.log(error);
			}
		);
	}
}
