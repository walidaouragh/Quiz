import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../_services/quiz.service';
import User = namespace.User;
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-user-detail',
	templateUrl: './user-detail.component.html',
	styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
	constructor(private quizService: QuizService, private route: ActivatedRoute) {}
	public user: User;
	public userId: number;
	public correctAnswers: number;
	public wrongAnswers: number;
	public displayedUserColumns: string[] = ['question', 'choice', 'correct'];
	ngOnInit() {
		this.userId = +this.route.snapshot.paramMap.get('userId');
		this.quizService.getUserById(this.userId).subscribe((user: User) => {
			this.user = user;
			this.correctAnswers = this.user.userAnswers.filter(c => c.isCorrect).length;
			this.wrongAnswers = this.user.userAnswers.filter(c => !c.isCorrect).length;
		});
	}
}
