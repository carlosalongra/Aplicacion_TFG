import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ViewFilesComponent } from './view-files/view-files.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { SelectAnalysisComponent } from './select-analysis/select-analysis.component';
import { ViewResultsComponent } from './view-results/view-results.component';
import { WordcountResultsComponent } from './wordcount-results/wordcount-results.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'view-files', component: ViewFilesComponent },
  { path: 'upload-files', component: UploadFilesComponent },
  { path: 'select-analysis', component: SelectAnalysisComponent },
  { path: 'view-results', component: ViewResultsComponent },
  { path: 'wordcount-results', component: WordcountResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

