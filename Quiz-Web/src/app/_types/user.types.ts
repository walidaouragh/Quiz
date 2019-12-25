declare module namespace {
	export interface User {
		userId?: number;
		email: string;
		firstName: string;
		lastName: string;
		OptionText?: any;
		userAnswers?: Array<UserAnswer>;
	}

	export interface UserAnswer {
		userId: number;
		userAnswerId: number;
		questionId: number;
		optionText: string;
		isCorrect: boolean;
	}
}
