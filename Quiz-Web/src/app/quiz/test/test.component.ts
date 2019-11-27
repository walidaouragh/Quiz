import { Component, OnInit } from '@angular/core';
import { QuizService } from "../../_services/quiz.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import IQuiz = namespace.IQuiz;
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import IOption = namespace.IOption;
import { HttpErrorResponse } from "@angular/common/http";
import * as _ from 'lodash';
import { ConfirmDialogComponent } from "../dialogs/confirm-dialog/confirm-dialog.component";
import { ComponentCanDeactivate } from "../../_services/candeactivateguard.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class  TestComponent extends ComponentCanDeactivate implements OnInit {

  constructor(private quizService: QuizService, private route: ActivatedRoute, public dialog: MatDialog, private router: Router) {
    super()
  }
  public quizId: number;
  public userId: any;
  public quiz: IQuiz;
  public answersForm: FormGroup;
  public correctAnswers: number;
  public incorrectAnswers: number;
  public isSubmitted: boolean = false;
  public selectedAnswer: any = {};
  public testPercentage: number;

  ngOnInit() {
    this.answersForm = new FormGroup({
      options: new FormArray([])
    });

    this.quizId = +this.route.snapshot.paramMap.get('id');
    this.userId = +this.route.snapshot.paramMap.get('userId');

    this.getQuiz(this.quizId);
  }

  public getQuiz(id: number): void {
    this.quizService.getQuiz(id).subscribe((q: IQuiz) => {
      this.quiz = q;
      this.quiz.questions.forEach(item => {
        let formArray = <FormArray>this.answersForm.get('options');
        formArray.push(new FormControl('', Validators.required));
      })
    })
  }

  public onChange(event: IOption): void {
    event.userId = this.userId;
    //progress bar increment for each click
    if (!!!event.questionId) return;
    this.selectedAnswer[event.questionId] = true;
    const arr = _.map(this.selectedAnswer);
    const trues = _.filter(arr, r => r === true).length;
    const arrLength = this.quiz.questions.length;
    this.testPercentage = (trues / arrLength) * 100;
  }

  public onSubmitAnswers(): void {
    this.isSubmitted = true;
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    this.dialog.open(ConfirmDialogComponent, dialogConfig);

    let  trueArray: any[] = [];
    let  falseArray: any[] = [];
    this.quizService.submitAnswers(this.answersForm.value.options).subscribe((options: IOption[]) => {
      this.quizService.selectedAnswers$.next(this.answersForm.value.options);
      this.quizService.totalQuestions$.next(this.quiz.questions.length);
      options.forEach((o: any) => {
        if (o.isCorrect === true) {
          trueArray.push(o);
          this.correctAnswers = trueArray.length;
          this.quizService.correctAnswers$.next(this.correctAnswers);
        } else {
          falseArray.push(o);
          this.correctAnswers = falseArray.length;
          this.incorrectAnswers = falseArray.length;
        }
      })
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data:{
        message: 'Are you sure want to submit?',
        buttonText: {
          ok: 'Save',
          cancel: 'Cancel'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.onSubmitAnswers();
        this.dialog.closeAll();
        this.router.navigate([`/quiz/${this.quizId}/result`])
      }
    });
  }

  public canDeactivate():boolean{
    return !this.answersForm.dirty || this.isSubmitted
  }

}
