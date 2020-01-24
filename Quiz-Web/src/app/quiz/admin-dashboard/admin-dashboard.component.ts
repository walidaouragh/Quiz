import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { QuizService } from '../../_services/quiz.service';
import User = namespace.User;
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { IEmployeeAdmin } from '../../_types/IEmployee';

@Component({
	selector: 'app-admin-dashboard',
	templateUrl: './admin-dashboard.component.html',
	styleUrls: ['./admin-dashboard.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AdminDashboardComponent implements OnInit {
	constructor(private quizService: QuizService, public dialog: MatDialog) {}

	public testers: User[];
	public employees: IEmployeeAdmin[];
	public isLoadingResults: boolean;

	ngOnInit() {
		this.getUsers();
		this.getEmployees();
	}

	public getUsers(): void {
		this.isLoadingResults = true;

		this.quizService.getUsers().subscribe(
			(users: User[]) => {
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

		this.quizService.getEmployees().subscribe(
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
