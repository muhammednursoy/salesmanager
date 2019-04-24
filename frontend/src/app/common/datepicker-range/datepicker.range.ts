import {Component, EventEmitter, Output} from '@angular/core';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-datepicker-range',
    templateUrl: './datepicker-range.html',
    styleUrls: ['./datepicker-range.css']
})
export class NgbDatepickerRange {

    hoveredDate: NgbDate;

    @Output("fromDate") fromDateEmitter = new EventEmitter<NgbDate>();
    @Output("toDate") toDateEmitter = new EventEmitter<NgbDate>();
    fromDate: NgbDate;
    toDate: NgbDate;

    constructor(calendar: NgbCalendar) {
        this.fromDate = calendar.getToday();
        this.toDate = null;
        this.fromDateEmitter.emit(this.fromDate);
        this.toDateEmitter.emit(this.toDate);
    }

    onDateSelection(date: NgbDate) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
        } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
            this.toDate = date;
        } else {
            this.toDate = null;
            this.fromDate = date;
        }
        this.fromDateEmitter.emit(this.fromDate);
        this.toDateEmitter.emit(this.toDate);
    }

    isHovered(date: NgbDate) {
        return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
    }

    isInside(date: NgbDate) {
        return date.after(this.fromDate) && date.before(this.toDate);
    }

    isRange(date: NgbDate) {
        return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
    }
}
