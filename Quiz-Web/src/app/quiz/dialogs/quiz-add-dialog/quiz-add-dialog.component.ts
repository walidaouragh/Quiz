import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuizService } from '../../../_services/quiz.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import IQuiz = namespace.IQuiz;
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-quiz-add-dialog',
	templateUrl: './quiz-add-dialog.component.html',
	styleUrls: ['./quiz-add-dialog.component.scss']
})
export class QuizAddDialogComponent implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<QuizAddDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public modalData: IQuiz,
		private quizService: QuizService,
		private fb: FormBuilder
	) {}

	public form: FormGroup;
	public errorMessage: string;
	public submitted: boolean = false;

	ngOnInit() {
		this.form = this.fb.group({
			quizName: new FormControl('', Validators.required)
		});
	}

	public onSubmit(form: FormGroup): void {
		this.submitted = true;
		this.quizService.creatQuiz(this.form.value).subscribe(
			(res: IQuiz) => {
				this.dialogRef.close(true);
			},
			(error: HttpErrorResponse) => {
				this.errorMessage = error.error;
			}
		);
	}

	public onCancel(): void {
		this.dialogRef.close(false);
	}
}
