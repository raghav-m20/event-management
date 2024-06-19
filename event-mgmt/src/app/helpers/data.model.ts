import { NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

export interface EventList {
    title: string;
    location: string;
    date: Date;
    description: string,
    eventid: string
}

export const ModalOptions: NgbModalOptions = {
    keyboard: false,
    backdrop: 'static'
}