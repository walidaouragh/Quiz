import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../_services/quiz.service';
import IQuiz = namespace.IQuiz;
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { QuestionEditDialogComponent } from '../../dialogs/question-edit-dialog/question-edit-dialog.component';
import { QuestionAddDialogComponent } from '../../dialogs/question-add-dialog/question-add-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
	selector: 'app-question',
	templateUrl: './question.component.html',
	styleUrls: ['./../admin-dashboard.component.scss']
})
export class QuestionComponent implements OnInit, AfterViewInit {
	constructor(
		private route: ActivatedRoute,
		private quizService: QuizService,
		private elementRef: ElementRef,
		public dialog: MatDialog
	) {}
	public panelOpenState: boolean = false;
	public quizId: number;
	public quiz: IQuiz;
	public editDialogRef: Subscription;

	ngAfterViewInit(): void {
		this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#eaeaea';
	}

	ngOnInit() {
		this.quizId = +this.route.snapshot.paramMap.get('id');
		this.getQuiz(this.quizId);
	}
	public getQuiz(id: number): void {
		this.quizService.getQuiz(id).subscribe((q: IQuiz) => {
			this.quiz = q;
		});
	}

	public openEditQuestionDialog(question): void {
		const dialogConfig: MatDialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.width = '50%';

		dialogConfig.data = {
			questionId: question.questionId,
			quizId: question.quizId,
			questionText: question.questionText,
			options: question.options
		};

		if (this.dialog) {
			this.editDialogRef = this.dialog
				.open(QuestionEditDialogComponent, dialogConfig)
				.afterClosed()
				.subscribe((isTrue: boolean) => {
					if (isTrue) {
						this.getQuiz(this.quizId);
					}
				});
		}
	}

	public openAddQuestionDialog(): void {
		const dialogConfig: MatDialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.width = '50%';
		dialogConfig.data = {
			quizId: this.quizId
		};

		if (this.dialog) {
			this.editDialogRef = this.dialog
				.open(QuestionAddDialogComponent, dialogConfig)
				.afterClosed()
				.subscribe((isTrue: boolean) => {
					if (isTrue) {
						this.getQuiz(this.quizId);
					}
				});
		}
	}
	public onDelete(quizId, questionId): void {
		const dialogConfig: MatDialogConfig = new MatDialogConfig();
		this.dialog.open(ConfirmDialogComponent, dialogConfig);

		this.quizService.deleteQuestions(quizId, questionId).subscribe(res => {
			this.getQuiz(this.quizId);
		});
	}

	public openDialog(quizId, questionId): void {
		const dialogConfig: MatDialogConfig = new MatDialogConfig();
		dialogConfig.width = '30%';
		const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

		dialogRef.afterClosed().subscribe((confirmed: boolean) => {
			if (confirmed) {
				this.onDelete(quizId, questionId);
				this.dialog.closeAll();
			}
		});
	}
}
