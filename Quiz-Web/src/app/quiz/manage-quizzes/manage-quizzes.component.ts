import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../_services/quiz.service';
import { Router } from '@angular/router';
import IQuiz = namespace.IQuiz;
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { QuizAddDialogComponent } from '../dialogs/quiz-add-dialog/quiz-add-dialog.component';

@Component({
	selector: 'app-manage-quizzes',
	templateUrl: './manage-quizzes.component.html',
	styleUrls: ['./manage-quizzes.component.scss']
})
export class ManageQuizzesComponent implements OnInit {
	constructor(private quizService: QuizService, private router: Router, public dialog: MatDialog) {}
	public quizzes: IQuiz[];
	public quiz: IQuiz;
	public addQuizDialogRef: Subscription;

	ngOnInit() {
		this.getQuizzes();
	}

	public getQuizzes(): void {
		this.quizService.getQuizzes().subscribe((q: IQuiz[]) => {
			this.quizzes = q;
		});
	}

	public onQuizPick(id: number): void {
		this.router.navigate([`quiz/admin-dashboard/manage/${id}`]);
	}

	public openAddQuizDialog(): void {
		const dialogConfig: MatDialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.width = '50%';

		if (this.dialog) {
			this.addQuizDialogRef = this.dialog
				.open(QuizAddDialogComponent, dialogConfig)
				.afterClosed()
				.subscribe((isTrue: boolean) => {
					if (isTrue) {
						this.getQuizzes();
					}
				});
		}
	}
}
