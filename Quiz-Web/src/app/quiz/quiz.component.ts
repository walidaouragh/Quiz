import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'app-quiz',
	templateUrl: './quiz.component.html',
	styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, AfterViewInit {
	constructor(private router: Router, private loc: Location, private elementRef: ElementRef) {}

	public isConnected: boolean;

	//change a body color for only a specific component.
	ngAfterViewInit() {
		this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#eaeaea';
	}

	ngOnInit() {
		this.isConnected = navigator.onLine;
		this.getConnectionStatus();
	}

	private getConnectionStatus(): void {
		window.addEventListener('online', () => {
			this.isConnected = true;
			this.router.navigateByUrl(this.loc.path(true));
		});
		window.addEventListener('offline', () => {
			this.isConnected = false;
			this.router.navigate(['./quiz/offline'], { skipLocationChange: true });
		});
	}
}
