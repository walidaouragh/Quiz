import IQuestion = namespace.IQuestion;
import IOption = namespace.IOption;

export interface IQuestionModalData {
	question: IQuestion;
	options: Array<IOption>;
	questionText: string;
	questionId: number;
	quizId: number;
	optionId: number;
	isCorrect: boolean;
}
