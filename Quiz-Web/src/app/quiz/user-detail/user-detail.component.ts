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

	public print(): void {
		let tableCols: string = '';
		let tableRow: string = '';

		tableCols += `
            <th>Question</th>
            <th>Choice</th>
            <th>Correct?</th>
        `;

		this.user.userAnswers.forEach(val => {
			tableRow += `
                <tr>
                    <td>${val.questionText}</td>
                    <td>${val.optionText}</td>
                    <td>${val.isCorrect}</td>
                </tr>
            `;
		});

		this.windowPrint(tableCols, tableRow);
	}

	public windowPrint(tableCols: string, tableRow: string): void {
		const popupWin: any = window.open();
		popupWin.document.open();
		popupWin.document.write(
			`<html>
                <head>
                <title>${this.user.firstName} ' Score</title>
                    <style>
                        @media screen, print {
                            table {
                                border-spacing: 0;
                                border-collapse: collapse;
                                width: 100%;
                            }
                            td, th {
                                padding: 8px;
                                border-bottom: 1px solid #ddd;
                            }

                            thead > tr > th {
                                text-align: left;
                                vertical-align: bottom;
                                border-bottom: 2px solid #ddd;
                                color: #333;
                            }
                        }
                    </style>
                </head>
                <body onload="window.print()">
                    <h1>Result for Tester: ${this.user.firstName} ${this.user.lastName} (${this.user.email})</h1>
                    <table>
                        <thead>${tableCols}</thead>
                        <tbody>${tableRow}</tbody>
                    </table>
                    <h1>Score: To be implemented!</h1>
                </body>
            </html>`
		);
		popupWin.document.close();
	}
}
