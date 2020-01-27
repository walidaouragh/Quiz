declare module namespace {
	export interface IOption {
		optionId: number;
		questionId: number;
		optionText: string;
		isCorrect: boolean;
		testerId?: number;
		questionText?: string;
	}

	export interface IQuestion {
		questionId: number;
		quizId: number;
		questionText: string;
		options: Array<IOption>;
	}

	export interface IQuiz {
		quizId: number;
		schoolId: number;
		quizName: string;
		questions: Array<IQuestion>;
	}
}
