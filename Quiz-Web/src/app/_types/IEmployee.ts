export interface IEmployee {
	employeeId: number;
	email: string;
	firstName: string;
	lastName: string;
	isAdmin?: boolean;
	password: string;
	hireDate: Date;
	schoolId: number;
}

export interface IEmployeeAdmin {
	employeeId: number;
	email: string;
	firstName: string;
	lastName: string;
	isAdmin: boolean;
	hireDate: Date;
}
