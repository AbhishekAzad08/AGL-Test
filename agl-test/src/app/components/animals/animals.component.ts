import { Component, OnInit } from '@angular/core';
import { People } from 'src/app/models/people';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss']
})
export class AnimalsComponent implements OnInit {
  typeOfPetToFilter = 'Cat';
  petsList: any[] = [];
  selectedType: string;
  groupedData: any;
  uniqueGenders: any;
  private sub;
  peopleData: People[];
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.sub = this.dataService.getPeople().subscribe(
      data => {
        //Called when success
        this.peopleData = data;
        this.groupData(this.peopleData);
      },
      (error) => {
        //Called when error
      }
    ).add(() => {
      //Called when operation is complete (both success and error)
    });

  }

  groupData(data: People[]): any {
    if (data == undefined)
      return;

    this.uniqueGenders = Array.from(new Set(data.map((item: any) => item.gender)));//[...new Set(data.map(item => item.gender))];
    //console.log(this.uniqueGenders);
    for (let gender in this.uniqueGenders) {
      data.forEach(element => {
        if (element.gender == this.uniqueGenders[gender]) {
          let genderVal = this.uniqueGenders[gender];
          if (!this.petsList[genderVal])
            this.petsList[genderVal] = [];
          if (element.pets != null) {
            element.pets.forEach(pet => {
              if (pet.type == this.typeOfPetToFilter) {
                const genderType = this.uniqueGenders[gender];
                this.petsList.push({
                  genderType: genderType,
                  petName: pet.name
                })
              }
            });
          }
        }
      });
    }
    this.petsList=this.petsList.sort(this.comparator);
    //console.log(this.petsList);
  }
  comparator(a, b) {
    if (a.petName < b.petName) return -1;
    if (a.petName > b.petName) return 1;
    return 0;
  }
}
