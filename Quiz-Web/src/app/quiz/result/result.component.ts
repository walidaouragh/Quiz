import { Component, OnInit } from '@angular/core';
import { QuizService } from "../../_services/quiz.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(private quizService: QuizService) { }

  public correctAnswers: number;
  public totalQuestions: number;

  ngOnInit() {
    this.quizService.totalQuestions$.subscribe(total => {
      this.totalQuestions = total;
    });
    this.quizService.correctAnswers$.subscribe(correct => {
      this.correctAnswers = correct;
    });
  }

}
