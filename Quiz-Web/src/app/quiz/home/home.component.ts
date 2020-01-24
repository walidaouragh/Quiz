import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../_services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import IQuiz = namespace.IQuiz;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	constructor(private quizService: QuizService, private router: Router, private route: ActivatedRoute) {}

	public quizzes: IQuiz[];
	public testerId: number;

	ngOnInit() {
		this.testerId = +this.route.snapshot.paramMap.get('testerId');
		this.quizService.getQuizzes().subscribe((q: IQuiz[]) => {
			this.quizzes = q;
		});
	}

	public onNavigateToQuiz(id, quizName): void {
		this.router.navigate([`quiz/test/${id}/${this.testerId}/${quizName}`]);
	}
}
