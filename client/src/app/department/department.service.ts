import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import DepartmentModel from "./department.model";

@Injectable()
export default class DepartmentService {
    private readonly departmentUrl: string;
    constructor(private readonly httpClient: HttpClient) {
        this.departmentUrl = environment.apiUrl + '/department';
    }

    getAll() {
        return this.httpClient.get<DepartmentModel[]>(this.departmentUrl);
    }
}