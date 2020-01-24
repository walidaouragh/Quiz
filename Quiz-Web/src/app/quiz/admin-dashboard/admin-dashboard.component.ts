import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { QuizService } from '../../_services/quiz.service';
import User = namespace.User;
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { IEmployee } from '../../_types/IEmployee';

@Component({
	selector: 'app-admin-dashboard',
	templateUrl: './admin-dashboard.component.html',
	styleUrls: ['./admin-dashboard.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AdminDashboardComponent implements OnInit {
	constructor(private quizService: QuizService, public dialog: MatDialog) {}

	public testers: User[];
	public employees: IEmployee[];
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
			(employees: IEmployee[]) => {
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
