import { Component, Injectable } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';



@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})


export class SidebarComponent {

  constructor(private GifsService: GifsService){}

  get tags(){
    return this.GifsService.tagsHistory;
  }

  searchTag(tag:string){
    this.GifsService.searchTag(tag);
  }

}
