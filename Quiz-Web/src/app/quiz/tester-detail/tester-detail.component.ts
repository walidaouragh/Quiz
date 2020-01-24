import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../_services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import ITester = namespace.ITester;

@Component({
	selector: 'app-tester-detail',
	templateUrl: './tester-detail.component.html',
	styleUrls: ['./tester-detail.component.scss']
})
export class TesterDetailComponent implements OnInit {
	constructor(private quizService: QuizService, private route: ActivatedRoute) {}
	public tester: ITester;
	public testerId: number;
	public correctAnswers: number;
	public wrongAnswers: number;
	public displayedUserColumns: string[] = ['question', 'choice', 'correct'];
	ngOnInit() {
		this.testerId = +this.route.snapshot.paramMap.get('testerId');
		this.quizService.getTesterById(this.testerId).subscribe((tester: ITester) => {
			this.tester = tester;
			this.correctAnswers = this.tester.testerAnswers.filter(c => c.isCorrect).length;
			this.wrongAnswers = this.tester.testerAnswers.filter(c => !c.isCorrect).length;
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

		this.tester.testerAnswers.forEach(val => {
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
                <title>${this.tester.firstName} ' Score</title>
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
                    <h1>Result for Tester: ${this.tester.firstName} ${this.tester.lastName} (${this.tester.email})</h1>
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
