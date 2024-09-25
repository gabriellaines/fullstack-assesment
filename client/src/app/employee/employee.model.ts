import DepartmnetModel from "../department/department.model";

export default interface EmployeeModel {
  id?: number;
  firstName: string;
  lastName: string;
  hireDate: string;
  phone: string;
  address: string;
  department: DepartmnetModel; 
}