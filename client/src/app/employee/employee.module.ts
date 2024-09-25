import { NgModule } from "@angular/core";
import { EmployeeComponent } from "./employee.component";
import EmployeeService from "./employee.service";
import { ListComponent } from "./list/list.component";

@NgModule({
    declarations: [EmployeeComponent, ListComponent],
    providers: [EmployeeService],
    exports: [EmployeeComponent]
})
export default class EmployeeModule {}