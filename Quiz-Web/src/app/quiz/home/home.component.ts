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
	public schoolId: number;

	ngOnInit() {
		this.testerId = +this.route.snapshot.paramMap.get('testerId');
		this.schoolId = +this.route.snapshot.paramMap.get('schoolId');
		this.quizService.getQuizzes(this.schoolId).subscribe((q: IQuiz[]) => {
			this.quizzes = q;
		});
	}

	public onNavigateToQuiz(id, quizName): void {
		this.router.navigate([`quiz/test/${this.schoolId}/${id}/${this.testerId}/${quizName}`]);
	}
}
