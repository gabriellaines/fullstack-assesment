import DepartmentHistoryModel from "../department/department-history.model";
import DepartmentModel from "../department/department.model";

export default interface EmployeeModel {
  id?: number;
  firstName: string;
  lastName: string;
  hireDate: string;
  phone: string;
  address: string;
  department: DepartmentModel;
  departmentHistory?: DepartmentHistoryModel[];
  active: boolean;
}
