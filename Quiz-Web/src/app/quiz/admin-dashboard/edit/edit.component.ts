import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../_services/quiz.service';
import IQuiz = namespace.IQuiz;
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./../admin-dashboard.component.scss']
})
export class EditComponent implements OnInit, AfterViewInit {
	constructor(
		private route: ActivatedRoute,
		private quizService: QuizService,
		private elementRef: ElementRef,
		public dialog: MatDialog
	) {}
	public panelOpenState: boolean = false;
	public quizId: number;
	public quiz: IQuiz;
	public editDialogRef: MatDialogRef<EditDialogComponent>;

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

	public openEditDialog(question): void {
		const dialogConfig: MatDialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.width = '40%';

		dialogConfig.data = {
			option: question.options,
			question: question.questionText
		};

		if (this.dialog) {
			this.editDialogRef = this.dialog.open(EditDialogComponent, dialogConfig);
		}
	}
}
