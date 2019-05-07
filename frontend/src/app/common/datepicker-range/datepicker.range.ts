import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-datepicker-range',
    templateUrl: './datepicker-range.html',
    styleUrls: ['./datepicker-range.css']
})
export class NgbDatepickerRange implements OnInit {
    hoveredDate: NgbDate;

    @Output("fromDate") fromDateEmitter = new EventEmitter<NgbDate>();
    @Output("toDate") toDateEmitter = new EventEmitter<NgbDate>();
    fromDate: NgbDate;
    toDate: NgbDate;

    constructor(calendar: NgbCalendar, public cdref: ChangeDetectorRef) {
        let today = calendar.getToday();
        this.fromDate = new NgbDate(today.year - 1, today.month, today.day);
        this.toDate = today;
        this.fromDateEmitter.emit(this.fromDate);
        this.toDateEmitter.emit(this.toDate);
    }

    ngOnInit(): void {
        this.fromDateEmitter.emit(this.fromDate);
        this.toDateEmitter.emit(this.toDate);
        this.cdref.detectChanges();
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
