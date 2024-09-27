import DepartmentModel from "./department.model";

export default interface DepartmentHistoryModel {
    id: number;
    departmentId: number;
    employeeId: number;
    startDate: Date;
    department: DepartmentModel
}
