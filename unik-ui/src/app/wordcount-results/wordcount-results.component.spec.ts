import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordcountResultsComponent } from './wordcount-results.component';

describe('WordcountResultsComponent', () => {
  let component: WordcountResultsComponent;
  let fixture: ComponentFixture<WordcountResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordcountResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordcountResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
