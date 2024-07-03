import { Injectable, resolveForwardRef } from '@angular/core';
import { HttpClient, HttpParams, provideHttpClient } from '@angular/common/http';
import { Gif, SearchResponse, FixedHeight } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  //almacenar el historial de busqueda
  private _tagsHistory: string [] = [];
  private apiKey:       string = 'Hib6UwH2Mxi5dfgcZKNOtZdbsrIuZXeH';
  private serviceUrl:   string ='https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient){
    this.loadLocalStorage();
    console.log('Gifs Service Ready');
  }

  get tagsHistory(){
    return [...this._tagsHistory];
  }


  private organizeHistory(tag:string) {
    tag = tag.toLowerCase(); //para que salga en mayuscula en donde escribe el usuario

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory= this._tagsHistory.filter((oldTag) => oldTag !==tag )
    }
    this._tagsHistory.unshift(tag); //para apilar hacia arriba lo escrito por el usuario(tag)
    this._tagsHistory= this._tagsHistory.splice(0,10); //limitar las busqueda a 10
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))

  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length === 0)return;
    this.searchTag(this._tagsHistory[0]);

    }


    searchTag(tag:string):void {
     if(tag.length ===0)return;
        this.organizeHistory(tag);

        const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', 10)
          .set('q', tag)




        this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
        .subscribe(resp => {
        this.gifList=resp.data;
        console.log({gifs: this.gifList});
       });
  }
}
