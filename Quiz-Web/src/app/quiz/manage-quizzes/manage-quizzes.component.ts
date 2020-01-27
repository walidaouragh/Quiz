import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../_services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
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
	constructor(
		private quizService: QuizService,
		private router: Router,
		public dialog: MatDialog,
		private route: ActivatedRoute
	) {}
	public quizzes: IQuiz[];
	public quiz: IQuiz;
	public addQuizDialogRef: Subscription;
	public schoolId: number;

	ngOnInit() {
		this.getQuizzes();
	}

	public getQuizzes(): void {
		this.schoolId = +this.route.snapshot.paramMap.get('schoolId');
		this.quizService.getQuizzes(this.schoolId).subscribe((q: IQuiz[]) => {
			this.quizzes = q;
		});
	}

	public onQuizPick(schoolId: number, id: number): void {
		this.router.navigate([`quiz/admin-dashboard/manage/${schoolId}/${id}`]);
	}

	public openAddQuizDialog(): void {
		const dialogConfig: MatDialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.width = '50%';
		dialogConfig.data = this.schoolId;

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
