import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../_services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
	selector: 'app-result',
	templateUrl: './result.component.html',
	styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
	constructor(
		private quizService: QuizService,
		private route: ActivatedRoute,
		private router: Router,
		public dialog: MatDialog
	) {}

	public correctAnswersPercentage: number;
	public correctAnswers: number;
	public totalQuestions: number;
	public quizId: number;
	public testerId: number;
	public schoolId: number;

	ngOnInit() {
		this.quizId = +this.route.snapshot.paramMap.get('quizId');
		this.testerId = +this.route.snapshot.paramMap.get('testerId');
		this.schoolId = +this.route.snapshot.paramMap.get('schoolId');
		this.quizService.totalQuestions$.subscribe(total => {
			this.totalQuestions = total;
		});
		this.quizService.correctAnswers$.subscribe(correct => {
			this.correctAnswers = correct;
		});
		this.quizService.correctAnswersPercentage$.subscribe(percentage => {
			this.correctAnswersPercentage = percentage;
		});
	}

	public onNavigateToResult(): void {
		this.router.navigate([`/quiz/${this.schoolId}/${this.quizId}/check/${this.testerId}`]);
	}

	public openConfirmationDialog(): void {
		const dialogConfig: MatDialogConfig = new MatDialogConfig();
		dialogConfig.width = '30%';
		dialogConfig.data = {
			modalType: 'exit'
		};
		const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

		dialogRef.afterClosed().subscribe((confirmed: boolean) => {
			if (confirmed) {
				this.router.navigate(['tester-register']);
				this.dialog.closeAll();
			}
		});
	}
}
