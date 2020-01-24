import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IEmployee, IEmployeeAdmin } from '../../../_types/IEmployee';
import { QuizService } from '../../../_services/quiz.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-employees-table',
	templateUrl: './employees-table.component.html',
	styleUrls: ['./../admin-dashboard.component.scss']
})
export class EmployeesTableComponent implements OnChanges {
	constructor(private quizService: QuizService) {}

	public displayedEmployeesColumns: string[] = ['lastName', 'email', 'setAsAdmin'];
	@ViewChild(MatSort, { static: false }) employeeSort: MatSort;
	@ViewChild(MatPaginator, { static: false }) employeePaginator: MatPaginator;
	@ViewChild('employeesTable', { static: false }) employeeTable: ElementRef;

	@Input() employees: MatTableDataSource<IEmployee>;

	public employeeFilterText: string = '';
	public employeeResultsLength: number = 0;

	ngOnChanges(changes: SimpleChanges) {
		if (changes.employees && changes.employees.currentValue) {
			this.employees = new MatTableDataSource<IEmployee>(changes.employees.currentValue);
			this.employeeResultsLength = this.employees.data.length;
			this.employees.sort = this.employeeSort;
			this.employees.paginator = this.employeePaginator;
		}
	}

	public applyEmployeeFilter(filterValue: string): void {
		this.employees.filter = filterValue.trim().toLowerCase();
	}

	public setAsAdmin(employee: IEmployeeAdmin): void {
		employee.isAdmin = !employee.isAdmin;
		this.quizService.setEmployeeAsAdmin(employee.employeeId, employee.isAdmin).subscribe(
			() => {
				// success
			},
			(error: HttpErrorResponse) => {
				console.log(error);
			}
		);
	}
}
