declare module namespace {
	export interface IOption {
		optionId: number;
		questionId: number;
		optionText: string;
		isCorrect: boolean;
		userId?: number;
	}

	export interface IQuestion {
		questionId: number;
		quizId: number;
		questionText: string;
		options: Array<IOption>;
	}

	export interface IQuiz {
		quizId: number;
		quizName: string;
		questions: Array<IQuestion>;
	}
}
