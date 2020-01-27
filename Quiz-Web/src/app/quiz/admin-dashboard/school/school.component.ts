import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { IEmployeeAdmin } from '../../../_types/IEmployee';
import { QuizService } from '../../../_services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import ITester = namespace.ITester;

@Component({
	selector: 'app-school',
	templateUrl: './school.component.html',
	styleUrls: ['./../admin-dashboard.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SchoolComponent implements OnInit {
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
				this.employees = this.sortAndFilter(employees);
				this.isLoadingResults = false;
			},
			(error: HttpErrorResponse) => {
				this.isLoadingResults = false;
				console.log(error);
			}
		);
	}

	// don't allow the master Admin to be managed on this screen
	private sortAndFilter(data: IEmployeeAdmin[]): IEmployeeAdmin[] {
		let results: IEmployeeAdmin[] = data.filter(employee => employee.email !== 'walid@quiz.com');

		results = results.sort((a: IEmployeeAdmin, b: IEmployeeAdmin) => {
			const aName: string = `${a.lastName} ${a.firstName}`.toUpperCase();
			const bName: string = `${b.lastName} ${b.firstName}`.toUpperCase();
			if (aName < bName) {
				return -1;
			}
			if (aName > bName) {
				return 1;
			}
			return 0;
		});

		return results;
	}
}
