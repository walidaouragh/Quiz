import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../_services/quiz.service';
import IOption = namespace.IOption;
import IQuiz = namespace.IQuiz;
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
	selector: 'app-check',
	templateUrl: './check.component.html',
	styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {
	constructor(
		private quizService: QuizService,
		private route: ActivatedRoute,
		private router: Router,
		public dialog: MatDialog
	) {}

	public selectedOptions: IOption[];
	public selectedOption: any;
	public options: IOption[];
	public quiz: IQuiz;
	public quizId: number;
	public testerId: number;
	public schoolId: number;

	ngOnInit() {
		this.quizId = +this.route.snapshot.paramMap.get('quizId');
		this.testerId = +this.route.snapshot.paramMap.get('testerId');
		this.schoolId = +this.route.snapshot.paramMap.get('schoolId');
		this.getQuiz(this.schoolId, this.quizId);
		this.getSelectedOptions();
	}

	public getQuiz(schoolId: number, id: number): void {
		this.quizService.getQuiz(schoolId, id).subscribe((q: IQuiz) => {
			this.quiz = q;
			this.quiz.questions.forEach(q => {
				this.options = q.options;
			});
		});
	}

	public getSelectedOptions(): void {
		this.quizService.selectedAnswers$.subscribe((selectedAnswers: IOption[]) => {
			this.selectedOptions = selectedAnswers;
			this.selectedOptions.forEach(q => {
				this.selectedOption = q.isCorrect;
			});
		});
	}

	public backToTest(id, quizName): void {
		this.router.navigate([`quiz/test/${id}/${this.testerId}/${quizName}`]);
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
