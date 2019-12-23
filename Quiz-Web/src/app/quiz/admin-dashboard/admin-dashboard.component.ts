import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { QuizService } from '../../_services/quiz.service';
import IQuiz = namespace.IQuiz;
import { Router } from '@angular/router';

@Component({
	selector: 'app-admin-dashboard',
	templateUrl: './admin-dashboard.component.html',
	styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
	constructor(private quizService: QuizService, private router: Router) {}

	public quizzes: IQuiz[];
	public quiz: IQuiz;

	ngOnInit() {
		this.quizService.getQuizzes().subscribe((q: IQuiz[]) => {
			this.quizzes = q;
		});
	}

	public onQuizPick(id: number): void {
		this.router.navigate([`quiz/admin-dashboard/${id}`]);
	}
}
