export interface IEmployee {
	employeeId: number;
	email: string;
	firstName: string;
	lastName: string;
	isAdmin?: boolean;
	password: string;
}

export interface IEmployeeAdmin {
	employeeId: number;
	email: string;
	firstName: string;
	lastName: string;
	isAdmin: boolean;
}
