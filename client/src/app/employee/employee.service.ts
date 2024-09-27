import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import EmployeeModel from "./employee.model";
import { Observable } from "rxjs";

@Injectable()
export default class EmployeeService {
    private readonly employeeUrl: string;
    constructor(private readonly httpClient: HttpClient) {
        this.employeeUrl = environment.apiUrl + '/employee';
    }

    public getAll(): Observable<EmployeeModel[]> {
        return this.httpClient.get<EmployeeModel[]>(this.employeeUrl);
    }

    public getById(id: any) {
        return this.httpClient.get<EmployeeModel>(this.employeeUrl + '/' + id);
    }

    public updateEmployee(id: number, dataToUpdate: any) {
        return this.httpClient.patch(this.employeeUrl + '/' + id, dataToUpdate);
    }
}
