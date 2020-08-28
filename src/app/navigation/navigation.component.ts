import { Component, OnInit, Input } from '@angular/core';
import { EventcategoriesService } from './eventcategories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  eventType:any = [];
  eventList:any = {};
  category:string = 'all';
  view:string = 'list';
  content:any;

  constructor(private type:EventcategoriesService, private router:Router) {
    this.type.getCategoryData().subscribe( data => {
      this.eventType = data;
    });
    this.type.getListData("all").subscribe( (data: any) => {
      this.eventList = data;
    });
  }

  ngOnInit(): void {}

  categoryClicked(type:string){
    this.category = type;
    this.type.getListData(this.category).subscribe( (data: any) => {
      this.eventList = data;
    });

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    // this should set the the viewing but it flashes and defaults to list
    // uncomment and click the categories at the top to see it flash and go back to list view
    // this.toggleClicked(this.category);
    // so I had to call list by default
    this.toggleClicked('list');
  }

  classExclange(className:string, add:string, remove:string){
    let element = document.querySelectorAll(className);
    element.forEach(e => {
      e.classList.add(add);
      e.classList.remove(remove);
    });
  }

  toggleClicked(view:string){ 
    let cardContainer = document.getElementById('card-container').classList;
    let switchToggle = document.querySelectorAll('.mat-button-toggle');

    if (view == 'list') {
      this.view = view;

      switchToggle[0].classList.add('mat-button-toggle-checked');
      switchToggle[1].classList.remove('mat-button-toggle-checked');
      
      cardContainer.remove('card-container-grid');
      this.classExclange('.card', 'card-list', 'card-grid')
      this.classExclange('.card-image', 'card-list-image', 'card-grid-image')
      this.classExclange('.info-container', 'info-container-list', 'info-container-grid')
      this.classExclange('.title', 'title-list', 'title-grid')
      this.classExclange('.subtitle', 'subtitle-list', 'subtitle-grid')

    } else {
      this.view = view;

      switchToggle[1].classList.add('mat-button-toggle-checked');
      switchToggle[0].classList.remove('mat-button-toggle-checked');

      cardContainer.add('card-container-grid');
      this.classExclange('.card', 'card-grid', 'card-list')
      this.classExclange('.card-image', 'card-grid-image', 'card-list-image')
      this.classExclange('.info-container', 'info-container-grid', 'info-container-list')
      this.classExclange('.title', 'title-grid', 'title-list')
      this.classExclange('.subtitle', 'subtitle-grid', 'subtitle-list')
    }
  }

  // ** wanted to implement ** 
  // badge is for ticket availability
  // badge flashes at the top-left corner but does not stay when any category is clicked
  ticketBadge(){
    let ticketcheck = document.querySelectorAll('.card');
    let count = 0;
    ticketcheck.forEach(item => {
      this.content = this.eventList.item[count].tickets.has_tickets ? "Y" : "N";
      this.eventList.item[count]["badge"] = this.content;
      count++;
    });
  }
}
