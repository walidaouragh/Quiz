import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../_services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-result',
	templateUrl: './result.component.html',
	styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
	constructor(private quizService: QuizService, private route: ActivatedRoute, private router: Router) {}

	public correctAnswers: number;
	public totalQuestions: number;
	public quizId: number;

	ngOnInit() {
		this.quizId = +this.route.snapshot.paramMap.get('quizId');
		this.quizService.totalQuestions$.subscribe(total => {
			this.totalQuestions = total;
		});
		this.quizService.correctAnswers$.subscribe(correct => {
			this.correctAnswers = correct;
		});
	}

	public onNavigateToResult(): void {
		this.router.navigate([`/quiz/${this.quizId}/check`]);
	}
}
