import { Component, Input, OnInit } from '@angular/core';
import { EventList } from '../helpers/data.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../helpers/data.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  eventDetails!: EventList;
  isAdd = false;
  isEdit = false;
  eventDetailsForm!: FormGroup;
  editClicked = false
  header = '';
  showMessage = false;
  addSuccess = false;
  addFail = false;
  updateSuccess = false;
  updateFail = false;
  constructor(private fb: FormBuilder, private actRoute: ActivatedRoute, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(param => {
      if (param && param.get('eventId')) {
        this.isEdit = true;
        DataService.EventList.forEach((event: EventList) => {
          if (event.eventid === param.get('eventId')) {
            this.eventDetails = event;
          }
        })
      }
      else {
        this.isAdd = true;
      }
    })
    this.getForm();
    if (this.isAdd) {
      this.header = 'Add an event';
    }
    else if (this.isEdit) {
      this.eventDetailsForm.disable();
      this.header = 'Edit an event';
      this.setForm();
    }
  }

  getForm() {
    this.eventDetailsForm = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', [Validators.required, validateEventDate]],
      description: ['', Validators.required]
    })
  }

  setForm() {
    const controls = this.eventDetailsForm.controls;
    const dateValue = new Date(this.eventDetails.date);
    const year = dateValue.getFullYear();
    const month = ('0' + (dateValue.getMonth() + 1)).slice(-2);
    const day = ('0' + dateValue.getDate()).slice(-2);
    const formDate = `${year}-${month}-${day}`;
    controls['title'].setValue(this.eventDetails.title);
    controls['location'].setValue(this.eventDetails.location);
    controls['date'].setValue(formDate);
    controls['description'].setValue(this.eventDetails.description);
  }

  editForm() {
    this.editClicked = true;
    this.eventDetailsForm.enable();
  }

  goBack() {
    this.router.navigate([''])
  }

  operateOnEvent(operation: string) {
    const controls = this.eventDetailsForm.controls;
    const payload = {
      "title": controls['title'].value,
      "location": controls['location'].value,
      "description": controls['location'].value,
      "date": controls['location'].value,
      "eventid": controls['location'].value
    }
    if(operation === 'post') {
      this.postEvent(payload);
    }
    else if(operation === 'put') {
      this.updateEvent(payload);
    }
  }

  postEvent(payload: any) {
    this.dataService.postData("addevent", payload).subscribe({
      next: (data: any) => {
        this.showMessage = true;
        this.addSuccess = true;
        setTimeout(() => {
          this.showMessage = false;
          this.addSuccess = false;
        }, 3000)
      },
      error: (err: any) => {
        this.showMessage = true;
        this.addFail = true;
        setTimeout(() => {
          this.showMessage = false;
          this.addFail = false;
        }, 3000)
      }
    })
  }

  updateEvent(payload: any) {
    this.dataService.putData("updateevent", payload).subscribe({
      next: (data: any) => {
        this.showMessage = true;
        this.updateSuccess = true;
        setTimeout(() => {
          this.showMessage = false;
          this.updateSuccess = false;
        }, 3000)
      },
      error: (err: any) => {
        this.showMessage = true;
        this.updateFail = true;
        setTimeout(() => {
          this.showMessage = false;
          this.updateFail = false;
        }, 3000)
      }
    })
  }
}

function validateEventDate(control: FormControl): { [key: string]: boolean } | null {
  if (control.value) {
    const currentDate = new Date();
    const dateVal = new Date(control.value);

    if (dateVal < currentDate) {
      return { invalidDateError: true };
    }
  }
  return null;
}
