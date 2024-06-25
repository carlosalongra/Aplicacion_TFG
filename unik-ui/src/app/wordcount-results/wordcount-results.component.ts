import { Component, OnInit } from '@angular/core';
import { SparkService } from '../services/spark.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wordcount-results',
  templateUrl: './wordcount-results.component.html',
  styleUrls: ['./wordcount-results.component.css']
})
export class WordcountResultsComponent implements OnInit {
  wordcountResults: string = '';

  constructor(private sparkService: SparkService, private router: Router) { }

  ngOnInit(): void {
    this.fetchWordcountResults();
  }

  fetchWordcountResults(): void {
    this.sparkService.getWordCountResults().subscribe(data => {
      console.log('Fetched wordcount results:', data);  // Log the results to verify
      // Replace newlines with <br> tags for HTML display
      this.wordcountResults = data.replace(/\n/g, '<br>');
    }, error => {
      console.error('Error fetching wordcount results:', error);
      alert('An error occurred while fetching the wordcount results.');
    });
  }

  downloadWordcountResults(): void {
    this.sparkService.downloadResults().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'wordcount_results.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url); // Clean up
    }, error => {
      console.error('Download error:', error);
      alert('An error occurred while downloading the file.');
    });
  }

  navigateToAnalysis(): void {
    this.router.navigate(['select-analysis']);
  }
}

