import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import IOption = namespace.IOption;
import { IEmployeeAuthRequest } from '../_types/IQuizAuthResponse';
import IQuestion = namespace.IQuestion;
import IQuiz = namespace.IQuiz;
import { IEmployee } from '../_types/IEmployee';
import ITester = namespace.ITester;

@Injectable({
	providedIn: 'root'
})
export class QuizService {
	constructor(private http: HttpClient) {}

	public correctAnswersPercentage$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
	public correctAnswers$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
	public totalQuestions$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
	public selectedAnswers$: BehaviorSubject<IOption[]> = new BehaviorSubject<IOption[]>([]);

	public getQuizzes(schoolId: number): Observable<any> {
		return this.http.get(`https://localhost:5001/api/quiz/${schoolId}`);
	}

	public getQuiz(schoolId: number, quizId: number): Observable<any> {
		return this.http.get(`https://localhost:5001/api/quiz/${schoolId}/${quizId}`);
	}

	public register(tester: ITester): Observable<any> {
		return this.http.post('https://localhost:5001/api/tester', tester);
	}

	public submitAnswers(options: IOption, testerId: number, quizName: string): Observable<any> {
		return this.http.post(`https://localhost:5001/api/testerAnswer/${testerId}/${quizName}`, options);
	}

	public LoginEmployee(employee: IEmployeeAuthRequest): Observable<any> {
		return this.http.post('https://localhost:5001/api/employee/login', employee);
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

	public getTesters(schoolId: number): Observable<any> {
		return this.http.get(`https://localhost:5001/api/tester/${schoolId}`);
	}

	public getTesterById(schoolId: number, testerId: number): Observable<any> {
		return this.http.get(`https://localhost:5001/api/tester/${schoolId}/${testerId}`);
	}

	public deleteTester(testerId: number): Observable<any> {
		return this.http.delete(`https://localhost:5001/api/tester/${testerId}`);
	}

	public creatQuiz(quiz: IQuiz): Observable<any> {
		return this.http.post('https://localhost:5001/api/quiz', quiz);
	}

	public registerEmployee(employee: IEmployee): Observable<any> {
		return this.http.post('https://localhost:5001/api/employee/register', employee);
	}

	public getEmployees(schoolId: number): Observable<any> {
		return this.http.get(`https://localhost:5001/api/employee/${schoolId}`);
	}

	public setEmployeeAsAdmin(employeeId: number, isAdmin: boolean): Observable<any> {
		return this.http.put(`https://localhost:5001/api/employee/set-admin/${employeeId}/${isAdmin}`, null);
	}

	public getSchools(): Observable<any> {
		return this.http.get('https://localhost:5001/api/school');
	}

	public getSchool(schoolId: number): Observable<any> {
		return this.http.get(`https://localhost:5001/api/school/${schoolId}`);
	}
}
