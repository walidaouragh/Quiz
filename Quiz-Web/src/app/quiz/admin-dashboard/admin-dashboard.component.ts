import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../_services/quiz.service';

import User = namespace.User;

@Component({
	selector: 'app-admin-dashboard',
	templateUrl: './admin-dashboard.component.html',
	styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
	constructor(private quizService: QuizService) {}

	public users: User[];
	public displayedPilotsColumns: string[] = ['userName', 'email'];

	ngOnInit() {
		this.quizService.getUsers().subscribe((users: User[]) => {
			this.users = users;
		});
	}
}
