import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventcategoriesService {

  constructor(private http:HttpClient) { }

  getCategoryData(): Observable<any[]>{
    let url = 'https://allevents.s3.amazonaws.com/tests/categories.json';
    return this.http.get<any[]>(url);
  }

  getListData(cat: string): Observable<any[]>{
    let url = 'https://allevents.s3.amazonaws.com/tests/'+cat+'.json';
    return this.http.get<any[]>(url);
  }

}
