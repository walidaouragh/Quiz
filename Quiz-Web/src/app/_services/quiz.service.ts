import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import User = namespace.User;
import IOption = namespace.IOption;
import { IAdminAuthRequest } from '../_types/IQuizAuthResponse';
import IQuestion = namespace.IQuestion;
import IQuiz = namespace.IQuiz;

@Injectable({
	providedIn: 'root'
})
export class QuizService {
	constructor(private http: HttpClient) {}

	public correctAnswersPercentage$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
	public correctAnswers$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
	public totalQuestions$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
	public selectedAnswers$: BehaviorSubject<IOption[]> = new BehaviorSubject<IOption[]>([]);

	public getQuizzes(): Observable<any> {
		return this.http.get('https://localhost:5001/api/quiz');
	}

	public getQuiz(id: number): Observable<any> {
		return this.http.get(`https://localhost:5001/api/quiz/${id}`);
	}

	public register(user: User): Observable<any> {
		return this.http.post('https://localhost:5001/api/user', user);
	}

	public submitAnswers(options: IOption, userId: number, quizName: string): Observable<any> {
		return this.http.post(`https://localhost:5001/api/userAnswer/${userId}/${quizName}`, options);
	}

	public LoginAdmin(admin: IAdminAuthRequest): Observable<any> {
		return this.http.post('https://localhost:5001/api/user/admin/login', admin);
	}

	public updateQuestions(question: IQuestion, quizId: number, questionId: number): Observable<any> {
		return this.http.put(`https://localhost:5001/api/question/edit/${quizId}/${questionId}`, question);
	}

	public creatQuestions(question: IQuestion, quizId: number): Observable<any> {
		return this.http.post(`https://localhost:5001/api/question/add/${quizId}`, question);
	}

	public deleteQuestions(quizId: number, questionId: number): Observable<any> {
		return this.http.delete(`https://localhost:5001/api/question/delete/${quizId}/${questionId}`);
	}

	public getUsers(): Observable<any> {
		return this.http.get('https://localhost:5001/api/user');
	}

	public getUserById(userId: number): Observable<any> {
		return this.http.get(`https://localhost:5001/api/user/${userId}`);
	}

	public deleteTester(userId: number): Observable<any> {
		return this.http.delete(`https://localhost:5001/api/user/${userId}`);
	}

	public creatQuiz(quiz: IQuiz): Observable<any> {
		return this.http.post('https://localhost:5001/api/quiz', quiz);
	}
}
