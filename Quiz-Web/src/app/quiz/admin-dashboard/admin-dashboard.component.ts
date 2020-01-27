import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../_services/quiz.service';
import { MatDialog } from '@angular/material/dialog';
import ISchool = namespace.ISchool;
import { Router } from '@angular/router';

@Component({
	selector: 'app-admin-dashboard',
	templateUrl: './admin-dashboard.component.html',
	styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
	constructor(private quizService: QuizService, public dialog: MatDialog, private router: Router) {}

	public schools: ISchool[];

	ngOnInit() {
		this.getSchools();
	}

	public getSchools() {
		this.quizService.getSchools().subscribe((schools: ISchool[]) => {
			this.schools = schools;
		});
	}

	public onNavigateToSchool(schoolId: number) {
		this.router.navigate([`quiz/admin-dashboard/${schoolId}`]);
	}
}
