import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import * as XLSX from 'xlsx';
import { QuizService } from '../../../_services/quiz.service';
import ITester = namespace.ITester;

@Component({
	selector: 'app-testers-table',
	templateUrl: './testers-table.component.html',
	styleUrls: ['./../admin-dashboard.component.scss']
})
export class TestersTableComponent implements OnChanges {
	constructor(private quizService: QuizService, public dialog: MatDialog) {}

	public displayedTestersColumns: string[] = ['lastName', 'email', 'quizName', 'removeTester'];
	@ViewChild(MatSort, { static: false }) testerSort: MatSort;
	@ViewChild(MatPaginator, { static: false }) testerPaginator: MatPaginator;
	@ViewChild('testersTable', { static: false }) testerTable: ElementRef;

	@Input() testers: MatTableDataSource<ITester>;

	public testerFilterText: string = '';
	public testerResultsLength: number = 0;

	ngOnChanges(changes: SimpleChanges) {
		if (changes.testers && changes.testers.currentValue) {
			this.testers = new MatTableDataSource<ITester>(changes.testers.currentValue);
			this.testerResultsLength = this.testers.data.length;
			this.testers.sort = this.testerSort;
			this.testers.paginator = this.testerPaginator;
		}
	}

	public applyTesterFilter(filterValue: string): void {
		this.testers.filter = filterValue.trim().toLowerCase();
	}

	public openDeleteTesterDialog(testerId: any): void {
		const dialogConfig: MatDialogConfig = new MatDialogConfig();
		dialogConfig.width = '30%';
		dialogConfig.data = {
			modalType: 'delete'
		};
		const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

		dialogRef.afterClosed().subscribe((confirmed: boolean) => {
			if (confirmed) {
				this.onDeleteTester(testerId);
				this.dialog.closeAll();
			}
		});
	}

	public onDeleteTester(testerId): void {
		const dialogConfig: MatDialogConfig = new MatDialogConfig();
		dialogConfig.data = {
			modalType: 'delete'
		};
		this.dialog.open(ConfirmDialogComponent, dialogConfig);

		this.quizService.deleteTester(testerId).subscribe(res => {
			/*this.getTesters();*/
		});
	}

	//npm install xlsx file-saver --save
	public exportToExcel(): void {
		const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.testerTable.nativeElement);
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

		this.testers.filteredData.forEach(val => {
			tableRow += `
                <tr>
                    <td>${val.firstName} ${val.lastName}</td>
                    <td>${val.email}</td>
                    <td>${val.testerAnswers[0].quizName}</td>
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
