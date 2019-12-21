import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IConfirmDialog } from '../../../_types/IConfirmDialog';

@Component({
	selector: 'app-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
	constructor(dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: IConfirmDialog) {
		this.dialogRef = dialogRef;
		this.modalType = data.modalType;
	}

	public modalType: string = '';
	private dialogRef: MatDialogRef<ConfirmDialogComponent>;

	public onCancel(): void {
		this.dialogRef.close();
	}

	public onSubmit(): void {
		this.dialogRef.close(true);
	}
}
