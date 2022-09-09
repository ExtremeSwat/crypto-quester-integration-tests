import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLandComponent } from './table-land.component';

describe('TableLandComponent', () => {
  let component: TableLandComponent;
  let fixture: ComponentFixture<TableLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableLandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
