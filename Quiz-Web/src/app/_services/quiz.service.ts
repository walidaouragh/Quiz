import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import User = namespace.User;
import IOption = namespace.IOption;

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  public correctAnswers$: Subject<number> =  new Subject<number>();
  public totalQuestions$: Subject<number> =  new Subject<number>();

  public getQuizzes(): Observable<any> {
    return this.http.get("https://localhost:5001/api/quiz")
  }

  public getQuiz(id: number): Observable<any> {
    return this.http.get(`https://localhost:5001/api/quiz/${id}`)
  }

  public register(user: User): Observable<any> {
    return this.http.post('https://localhost:5001/api/user', user)
  }

  public submitAnswers(options: IOption): Observable<any> {
    return this.http.post('https://localhost:5001/api/userAnswer', options)
  }
}
