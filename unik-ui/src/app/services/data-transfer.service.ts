import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private baseUrl = 'http://localhost:8080/api/data-transfer'; // Adjust this URL if needed

  constructor(private http: HttpClient) { }

  uploadSelectedFilesToHDFS(ids: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/transfer`, ids);
  }

  getMetadataFromHDFS(): Observable<any> {
    return this.http.get(`${this.baseUrl}/hdfs`);
  }

  downloadMetadataFromHDFS(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/hdfs/download`, { responseType: 'blob' });
  }
}

