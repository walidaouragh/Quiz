declare module namespace {

	export interface Quizze {
		quizId: number;
		quizName: string;
		questions?: any;
	}

	export interface ISchool {
		schoolId: number;
		schoolName: string;
		location: string;
		quizzes: Array<Quizze>;
		employees?: any;
		testers?: any;
	}

}
