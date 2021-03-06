import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { IQuizAuthResponse } from '../../_types/IQuizAuthResponse';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	constructor(private router: Router, private dialog: MatDialog) {}

	public dialogConfig: MatDialogConfig = new MatDialogConfig();
	public alertDialogRef: MatDialogRef<ConfirmDialogComponent>;
	public userDetail: IQuizAuthResponse;

	ngOnInit() {
		this.getUserDetails();
	}

	public getUserDetails(): void {
		const data: string = localStorage.getItem('DATA');
		if (data) {
			this.userDetail = JSON.parse(data);
		}
	}

	public logout(): void {
		this.dialogConfig.disableClose = false;
		this.dialogConfig.width = '30%';
		this.dialogConfig.data = {
			modalType: 'logout'
		};
		if (this.dialog) {
			this.alertDialogRef = this.dialog.open(ConfirmDialogComponent, this.dialogConfig);
		}
		if (this.alertDialogRef) {
			this.alertDialogRef.afterClosed().subscribe((isTrue: boolean) => {
				this.alertDialogRef = null;
				if (isTrue) {
					this.router.navigateByUrl('/login');
				}
			});
		}
	}
}
