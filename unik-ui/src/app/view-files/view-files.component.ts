import { Component, OnInit } from '@angular/core';
import { HdfsFileService } from '../services/hdfs-file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.css']
})
export class ViewFilesComponent implements OnInit {
  files: any[] = [];
  selectedFile: any = null;

  constructor(private hdfsFileService: HdfsFileService, private router: Router) { }

  ngOnInit(): void {
    this.hdfsFileService.getAllFiles().subscribe(data => {
      this.files = data;
    });
  }

  showFileInfo(file: any): void {
    this.selectedFile = file;
  }

  downloadFile(filePath: string): void {
    this.hdfsFileService.downloadFile(filePath).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = this.getFileNameFromPath(filePath); // Use a helper method to extract file name from path
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url); // Clean up
    }, error => {
      console.error('Download error:', error);
      alert('An error occurred while downloading the file.');
    });
  }

  getFileNameFromPath(filePath: string): string {
    return filePath.split('/').pop() || 'download';
  }

  navigateToUpload(): void {
    this.router.navigate(['upload-files'], { state: { selectedFiles: this.files.map(file => file.id) } });
  }

  navigateToHome(): void {
    this.router.navigate(['']);
  }
}

