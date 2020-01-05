import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QuizService } from '../../_services/quiz.service';
import User = namespace.User;
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import * as XLSX from 'xlsx';

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
	@ViewChild('testersTable', { static: false }) table: ElementRef;

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

	//npm install xlsx file-saver --save
	public exportToExcel(): void {
		const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		/* save to file */
		XLSX.writeFile(wb, 'testers.xlsx');
	}

	public print(): void {
		let tableCols: string = '';
		let tableRow: string = '';

		tableCols += `
            <th>Tester</th>
            <th>Email</th>
            <th>Quiz</th>
        `;

		this.users.filteredData.forEach(val => {
			tableRow += `
                <tr>
                    <td>${val.firstName} ${val.lastName}</td>
                    <td>${val.email}</td>
                    <td>${val.userAnswers[0].quizName}</td>
                </tr>
            `;
		});

		this.windowPrint(tableCols, tableRow);
	}

	public windowPrint(tableCols: string, tableRow: string): void {
		const popupWin: any = window.open();
		popupWin.document.open();
		popupWin.document.write(
			`<html>
                <head>
                <title>Testers</title>
                    <style>
                        @media screen, print {
                            table {
                                border-spacing: 0;
                                border-collapse: collapse;
                                width: 100%;
                            }
                            td, th {
                                padding: 8px;
                                border-bottom: 1px solid #ddd;
                            }

                            thead > tr > th {
                                text-align: left;
                                vertical-align: bottom;
                                border-bottom: 2px solid #ddd;
                                color: #333;
                            }
                        }
                    </style>
                </head>
                <body onload="window.print()">
                    <h1>Testers</h1>
                    <table>
                        <thead>${tableCols}</thead>
                        <tbody>${tableRow}</tbody>
                    </table>
                </body>
            </html>`
		);
		popupWin.document.close();
	}
}
