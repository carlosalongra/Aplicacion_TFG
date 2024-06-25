import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAnalysisComponent } from './select-analysis.component';

describe('SelectAnalysisComponent', () => {
  let component: SelectAnalysisComponent;
  let fixture: ComponentFixture<SelectAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
