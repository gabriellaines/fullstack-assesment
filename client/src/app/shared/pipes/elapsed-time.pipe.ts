import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'elapsedTime'
})
export class ElapsedTimePipe implements PipeTransform {
    transform(hireDate: string) {
        const hireDateObj = new Date(hireDate);
        const currentDate = new Date();

        let years = currentDate.getFullYear() - hireDateObj.getFullYear();
        let months = currentDate.getMonth() - hireDateObj.getMonth();
        let days = currentDate.getDate() - (hireDateObj.getDate() + 1);

        if (days < 0) {
            months--;
            const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            days += previousMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }
        
        const yearsTotal = years > 0 ? `${years}y -` : '';
        const monthsTotal = months > 0 ? `${months}m -` : '';

        return `(${yearsTotal}${monthsTotal}${days}d)`;
    }
}