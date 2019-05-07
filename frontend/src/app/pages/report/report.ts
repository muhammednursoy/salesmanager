export class MonthlyReport {
    value: number;
    month: number;
}

export class ReportMap {
    product: string;
    unit: string;
    values: MonthlyReport[];
}
