export interface IAdminAuthRequest {
	email: string;
	password: string;
}

export interface IQuizAuthResponse {
	adminId: string;
	success: boolean;
	token: string;
	isAdmin: boolean;
	DisplayName: string;
	Errors: string;
}
