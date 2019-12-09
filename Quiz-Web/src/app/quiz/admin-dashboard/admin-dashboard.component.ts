import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { QuizService } from '../../_services/quiz.service';
import IQuiz = namespace.IQuiz;
import { Router } from '@angular/router';

@Component({
	selector: 'app-admin-dashboard',
	templateUrl: './admin-dashboard.component.html',
	styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
	constructor(private quizService: QuizService, private router: Router, private elementRef: ElementRef) {}

	public quizzes: IQuiz[];
	public quiz: IQuiz;

	//change a body color for only a specific component.
	ngAfterViewInit() {
		this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#eaeaea';
	}
	ngOnInit() {
		this.quizService.getQuizzes().subscribe((q: IQuiz[]) => {
			this.quizzes = q;
		});
	}

	public onQuizPick(id: number): void {
		this.router.navigate([`quiz/admin-dashboard/${id}`]);
	}
}
