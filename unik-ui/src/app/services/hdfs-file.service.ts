import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HdfsFileService {

  private baseUrl = 'http://localhost:8080/api/file'; // Adjust this URL if needed

  constructor(private http: HttpClient) { }

  getAllFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getFileById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getFilesByDirectory(directoryPath: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/by-directory`, { params: { directoryPath } });
  }

  downloadFile(filePath: string): Observable<Blob> {
    return this.http.get(`http://192.168.0.230:8080/files/download`,
      { params: { path: filePath }, responseType: 'blob' });
  }
  readFile(filePath: string): Observable<string> {
    return this.http.get(`${this.baseUrl}/read`, { params: { path: filePath }, responseType: 'text' });
  }
  
}


