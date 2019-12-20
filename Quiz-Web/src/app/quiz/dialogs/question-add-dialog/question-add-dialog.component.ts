import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IQuestionModalData } from '../../../_types/IQuizModalData.types';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuizService } from '../../../_services/quiz.service';
import IQuestion = namespace.IQuestion;
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-question-add-dialog',
	templateUrl: './question-add-dialog.component.html',
	styleUrls: ['./question-add-dialog.component.scss']
})
export class QuestionAddDialogComponent implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<QuestionAddDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public modalData: IQuestionModalData,
		private quizService: QuizService,
		private fb: FormBuilder
	) {}

	public form: FormGroup;
	public errorMessage: string;
	public errorMessage2: string;

	ngOnInit() {
		this.form = this.fb.group({
			quizId: new FormControl(this.modalData.quizId),
			questionText: new FormControl('', Validators.required),
			options: this.fb.array([
				this.fb.group({
					optionText: new FormControl('', Validators.required),
					isCorrect: new FormControl(false, [Validators.required])
				}),
				this.fb.group({
					optionText: new FormControl('', Validators.required),
					isCorrect: new FormControl(false, [Validators.required])
				}),
				this.fb.group({
					optionText: new FormControl('', Validators.required),
					isCorrect: new FormControl(false, [Validators.required])
				}),
				this.fb.group({
					optionText: new FormControl('', Validators.required),
					isCorrect: new FormControl(false, [Validators.required])
				})
			])
		});
	}

	get options(): FormArray {
		return this.form.get('options') as FormArray;
	}

	public onSubmit(form: FormGroup): void {
		this.quizService.creatQuestions(this.form.value, this.modalData.quizId).subscribe(
			(res: IQuestion) => {
				this.dialogRef.close(true);
			},
			(error: HttpErrorResponse) => {
				this.errorMessage = error.message;
				console.log('errorMessage', this.errorMessage);
				this.errorMessage2 = error.error;
			}
		);
	}

	public onCancel(): void {
		this.dialogRef.close(false);
	}
}
