import { Component, OnInit, ViewChild } from '@angular/core';
import { QuizService } from '../../_services/quiz.service';
import User = namespace.User;
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
	selector: 'app-admin-dashboard',
	templateUrl: './admin-dashboard.component.html',
	styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
	constructor(private quizService: QuizService, public dialog: MatDialog) {}
	public displayedUsersColumns: string[] = ['lastName', 'email', 'quizName', 'removeTester'];
	public users: MatTableDataSource<User>;
	public filterText: string = '';
	public resultsLength: number = 0;
	public isLoadingResults: boolean;

	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

	ngOnInit() {
		this.getUsers();
	}

	public getUsers(): void {
		this.isLoadingResults = true;
		this.users = new MatTableDataSource<User>();

		this.quizService.getUsers().subscribe(
			users => {
				this.users = new MatTableDataSource(users);
				this.resultsLength = this.users.data.length;
				this.users.sort = this.sort;
				this.users.paginator = this.paginator;
				this.isLoadingResults = false;
			},
			(error: HttpErrorResponse) => {
				this.isLoadingResults = false;
				console.log(error);
			}
		);
	}

	public applyFilter(filterValue: string): void {
		this.users.filter = filterValue.trim().toLowerCase();
	}

	public openDeleteTesterDialog(userId: any): void {
		const dialogConfig: MatDialogConfig = new MatDialogConfig();
		dialogConfig.width = '30%';
		dialogConfig.data = {
			modalType: 'delete'
		};
		const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

		dialogRef.afterClosed().subscribe((confirmed: boolean) => {
			if (confirmed) {
				this.onDeleteTester(userId);
				this.dialog.closeAll();
			}
		});
	}

	public onDeleteTester(userId): void {
		const dialogConfig: MatDialogConfig = new MatDialogConfig();
		dialogConfig.data = {
			modalType: 'delete'
		};
		this.dialog.open(ConfirmDialogComponent, dialogConfig);

		this.quizService.deleteTester(userId).subscribe(res => {
			this.getUsers();
		});
	}
}
