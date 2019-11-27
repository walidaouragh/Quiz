import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../_services/quiz.service';
import IOption = namespace.IOption;
import IQuiz = namespace.IQuiz;
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-check',
	templateUrl: './check.component.html',
	styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {
	constructor(private quizService: QuizService, private route: ActivatedRoute) {}

	public selectedOptions: IOption[];
	public selectedOption: any;
	public options: IOption[];
	public quiz: IQuiz;
	public quizId: number;

	ngOnInit() {
		this.quizId = +this.route.snapshot.paramMap.get('quizId');
		this.getQuiz(this.quizId);
		this.getSelectedOptions();
	}

	public getQuiz(id: number): void {
		this.quizService.getQuiz(id).subscribe((q: IQuiz) => {
			this.quiz = q;
			this.quiz.questions.forEach(q => {
				this.options = q.options;
			});
		});
	}

	public getSelectedOptions(): void {
		this.quizService.selectedAnswers$.subscribe((selectedAnswers: IOption[]) => {
			this.selectedOptions = selectedAnswers;
			this.selectedOptions.forEach(q => {
				this.selectedOption = q.isCorrect;
			});
		});
	}
}
