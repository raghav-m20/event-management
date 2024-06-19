import { Component, OnInit } from '@angular/core';
import { DataService } from '../helpers/data.service';
import { EventList, ModalOptions } from '../helpers/data.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { ConfirmDialogComponent } from '../helpers/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  initialEventList: EventList[] = [];
  eventList: EventList[] = [];
  paginatedEventList: EventList[] = [];
  filteredEventList: EventList[] = [];
  apiFail = false;
  itemsPerPage = 10;
  itemsPerPageOptions = [5, 10, 15, 20];
  currentPage = 1;
  totalPages = 1;
  searchText = '';
  showMessage = false;
  deleteSuccess = false;
  deleteFail = false;

  constructor(private dataService: DataService, private modal: NgbModal, private router: Router) {}

  ngOnInit(): void {
    this.getEventList();
  }

  getEventList() {
    this.dataService.getData("eventlist").subscribe({
      next: (data: any) => {
        const length = data && data.events ? data.events.length : 0;
        if (length > 0) {
          this.eventList = this.initialEventList = data.events;
          this.totalPages = Math.ceil(this.eventList.length / this.itemsPerPage);
          this.setPage(1);
          this.applyFilter();
        } else {
          this.eventList = this.initialEventList = [];
        }
        DataService.EventList = this.eventList;
      },
      error: (err: any) => {
        this.apiFail = true;
        this.eventList = this.initialEventList = [];
        DataService.EventList = this.eventList;
      }
    });
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedEventList = this.filteredEventList.slice(start, end);
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  onItemsPerPageChange(event: any) {
    this.itemsPerPage = parseInt(event.target.value, 10);
    this.totalPages = Math.ceil(this.filteredEventList.length / this.itemsPerPage);
    this.setPage(1);
  }

  applyFilter() {
    const searchTextLower = this.searchText.toLowerCase().trim();
    if (searchTextLower === '') {
      this.filteredEventList = [...this.eventList];
    } else {
      this.filteredEventList = this.eventList.filter(event =>
        event.title.toLowerCase().includes(searchTextLower) ||
        event.location.toLowerCase().includes(searchTextLower)
      );
    }
    this.totalPages = Math.ceil(this.filteredEventList.length / this.itemsPerPage);
    this.setPage(1);
  }

  openDetails(eventId?: string) {
    if (eventId != undefined && eventId != null) {
      this.router.navigate(['event-details', eventId]);
    } else {
      this.router.navigate(['event-details']);
    }
  }

  deleteEvent(eventId: string) {
    const modal = this.modal.open(ConfirmDialogComponent);
    modal.componentInstance.eventId = eventId;
    modal.result.then((data: any) => {
      if(data === 'success') {
        this.showMessage = true;
        this.deleteSuccess = true;
        setTimeout(()=>{
          this.showMessage = false;
          this.deleteSuccess = false;
        }, 3000)
      }
      else if (data === 'failed') {
        this.showMessage = true;
        this.deleteFail = true;
        setTimeout(()=>{
          this.showMessage = false;
          this.deleteFail = false;
        }, 3000)
      }
    })
  } 
}
