export interface IEmployeeAuthRequest {
	email: string;
	password: string;
}

export interface IQuizAuthResponse {
	employeeId: number;
	success: boolean;
	token: string;
	isAdmin: boolean;
	displayName: string;
	errors: string;
}
