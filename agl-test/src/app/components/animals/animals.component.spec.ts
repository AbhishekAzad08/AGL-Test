import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { People } from 'src/app/models/people';
import {DataService} from '../../services/data.service'
import { AnimalsComponent } from './animals.component';

describe('AnimalsComponent', () => {
  let component: AnimalsComponent;
  let fixture: ComponentFixture<AnimalsComponent>;
  let de:DebugElement;
  let serviceStub:any;
  let element:HTMLElement;

  class MockDataService {
    getPeople(): Observable<People[]> {
      return of([
        {
            "name": "Bob",
            "gender": "Male",
            "age": 23,
            "pets": [
                {
                    "name": "Garfield",
                    "type": "Cat"
                },
                {
                    "name": "Fido",
                    "type": "Dog"
                }
            ]
        },
        {
            "name": "Jennifer",
            "gender": "Female",
            "age": 18,
            "pets": [
                {
                    "name": "Garfield",
                    "type": "Cat"
                }
            ]
        },
        {
            "name": "Steve",
            "gender": "Male",
            "age": 45,
            "pets": null
        },
        {
            "name": "Fred",
            "gender": "Male",
            "age": 40,
            "pets": [
                {
                    "name": "Tom",
                    "type": "Cat"
                },
                {
                    "name": "Max",
                    "type": "Cat"
                },
                {
                    "name": "Sam",
                    "type": "Dog"
                },
                {
                    "name": "Jim",
                    "type": "Cat"
                }
            ]
        },
        {
            "name": "Samantha",
            "gender": "Female",
            "age": 40,
            "pets": [
                {
                    "name": "Tabby",
                    "type": "Cat"
                }
            ]
        },
        {
            "name": "Alice",
            "gender": "Female",
            "age": 64,
            "pets": [
                {
                    "name": "Simba",
                    "type": "Cat"
                },
                {
                    "name": "Nemo",
                    "type": "Fish"
                }
            ]
        }
    ]);
    }
  }
  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
      declarations: [ AnimalsComponent ],
      imports: [HttpClientTestingModule],
      providers:[{provide:DataService,useValue:new MockDataService()}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalsComponent);
    component = fixture.componentInstance;
    de=fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have proper heading',()=>{
    expect(component.heading).toBe('AGL Developer Test');
  });
  it('get Cats based on Gender',()=>{
    component.getDataFromService();
    de=fixture.debugElement.query(By.css('.petList'));;
    element  = de.nativeElement;
    expect(element.innerText).toContain("Garfield");
    // expect(element.innerText).toContain("Tom");
    // expect(element.innerText).toContain("Max");
    // expect(element.innerText).toContain("Jim");
    // expect(element.innerText).toContain("Tabby");
    expect(element.innerText).not.toContain("Garfield2");
    
    //expect(de.query(By.css('.petList'))).toContain('Garfield');
  })
});
