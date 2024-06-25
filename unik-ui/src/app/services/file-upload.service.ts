import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = 'http://localhost:8080/files';

  constructor(private http: HttpClient) { }

  uploadFile(file: File, title: string, authors: string[]): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('authors', JSON.stringify(authors)); // Convert authors array to JSON string

    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  downloadFile(fileName: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download/${fileName}`, { responseType: 'blob' });
  }
}

