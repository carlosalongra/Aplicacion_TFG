import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SparkService } from '../services/spark.service';

@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.css']
})
export class ViewResultsComponent implements OnInit {
  results: any[] = [];

  constructor(private router: Router, private sparkService: SparkService) {}

  ngOnInit(): void {
    this.sparkService.downloadResults().subscribe(blob => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.results = JSON.parse(e.target.result);
      };
      reader.readAsText(blob);
    }, error => {
      console.error('Download error:', error);
      alert('An error occurred while downloading the results.');
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  downloadResults(): void {
    this.sparkService.downloadResults().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'analysis_results.json'; // Specify the file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, error => {
      console.error('Download error:', error);
      alert('An error occurred while downloading the results.');
    });
  }
}

