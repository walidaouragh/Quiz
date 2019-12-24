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
	public userId: number;

	ngOnInit() {
		this.quizId = +this.route.snapshot.paramMap.get('quizId');
		this.userId = +this.route.snapshot.paramMap.get('userId');
		this.getQuiz(this.quizId);
		this.getSelectedOptions();
	}

	public getQuiz(id: number): void {
		this.quizService.getQuiz(id).subscribe((q: IQuiz) => {
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

	public backToTest(id): void {
		this.router.navigate([`quiz/test/${id}/${this.userId}`]);
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
				this.router.navigate(['register']);
				this.dialog.closeAll();
			}
		});
	}
}
