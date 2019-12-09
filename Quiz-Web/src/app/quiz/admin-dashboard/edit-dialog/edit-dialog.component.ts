import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IQuestionModalData } from '../../../_types/IQuizModalData.types';
import IQuiz = namespace.IQuiz;

@Component({
	selector: 'app-edit-dialog',
	templateUrl: './edit-dialog.component.html',
	styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<EditDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public modalData: IQuestionModalData,
		private fb: FormBuilder
	) {}
	public form: FormGroup;
	public quiz: IQuiz;
	public optionText: string;

	ngOnInit() {
		this.modalData.option.forEach(o => {
			this.optionText = o.optionText;
		});

		this.form = this.fb.group({
			questionText: [this.modalData.question],
			option: [this.modalData.option]
		});

	}

	public onCancel(): void {
		this.dialogRef.close();
	}

	public onSubmit(): void {
		this.dialogRef.close(true);
	}
}
