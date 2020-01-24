declare module namespace {
	export interface ITester {
		testerId?: number;
		email: string;
		firstName: string;
		lastName: string;
		OptionText?: any;
		testerAnswers?: Array<ITesterAnswer>;
	}

	export interface ITesterAnswer {
		quizName: string;
		testerId: number;
		userAnswerId: number;
		questionId: number;
		optionText: string;
		isCorrect: boolean;
		questionText: string;
	}
}
