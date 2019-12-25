import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../_services/quiz.service';
import { Router } from '@angular/router';
import IQuiz = namespace.IQuiz;

@Component({
	selector: 'app-manage-quizzes',
	templateUrl: './manage-quizzes.component.html',
	styleUrls: ['./manage-quizzes.component.scss']
})
export class ManageQuizzesComponent implements OnInit {
	constructor(private quizService: QuizService, private router: Router) {}
	public quizzes: IQuiz[];
	public quiz: IQuiz;
	ngOnInit() {
		this.quizService.getQuizzes().subscribe((q: IQuiz[]) => {
			this.quizzes = q;
		});
	}
	public onQuizPick(id: number): void {
		this.router.navigate([`quiz/admin-dashboard/manage/${id}`]);
	}
}
