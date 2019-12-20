import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IQuestionModalData } from '../../../_types/IQuizModalData.types';
import IQuiz = namespace.IQuiz;
import { QuizService } from '../../../_services/quiz.service';
import IQuestion = namespace.IQuestion;
import { HttpErrorResponse } from '@angular/common/http';
import IOption = namespace.IOption;

@Component({
	selector: 'app-question-dialog',
	templateUrl: './question-edit-dialog.component.html',
	styleUrls: ['./question-edit-dialog.component.scss']
})
export class QuestionEditDialogComponent implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<QuestionEditDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public modalData: IQuestionModalData,
		private fb: FormBuilder,
		private quizService: QuizService
	) {}
	public form: FormGroup;
	public quiz: IQuiz;
	public errorMessage: string;
	public errorMessage2: string;
	public optionsCtrl: FormArray;

	ngOnInit() {
		this.optionsCtrl = this.fb.array([]);
		this.modalData.options.forEach((opt: IOption) => this.optionsCtrl.push(this.creatOption(opt)));
		this.form = this.fb.group({
			questionId: [this.modalData.questionId],
			quizId: [this.modalData.quizId],
			questionText: [this.modalData.questionText, Validators.required],
			options: this.optionsCtrl
		});
	}

	private creatOption = (obj: any): FormGroup => {
		return this.fb.group({
			optionId: [obj.optionId],
			questionId: [obj.questionId],
			optionText: [obj.optionText, Validators.required],
			isCorrect: [obj.isCorrect]
		});
	};

	public onCancel(): void {
		this.dialogRef.close(false);
	}

	public onSubmit(): void {
		this.quizService.updateQuestions(this.form.value, this.modalData.quizId, this.modalData.questionId).subscribe(
			(q: IQuestion) => {
				this.dialogRef.close(true);
			},
			(error: HttpErrorResponse) => {
				this.errorMessage = error.message;
				console.log('errorMessage', this.errorMessage);
				this.errorMessage2 = error.error;
			}
		);
	}
}
