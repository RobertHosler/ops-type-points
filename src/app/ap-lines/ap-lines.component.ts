import { Component, Input } from '@angular/core';
import { TypedPerson } from '../service/ops-data.service';
import { apModel } from '../model/ap-model';

@Component({
  selector: 'app-ap-lines',
  templateUrl: './ap-lines.component.html',
  styleUrls: ['./ap-lines.component.scss']
})
export class ApLinesComponent {

  @Input()
  typedPerson: TypedPerson;

  apModel = apModel;

  apType: {
    name: string;
    sexta: string;
    descriptionLink: string;
    sextaLink: string;
  };

  aspects: string[];
  subtypes;

  subtypeStrings;
  subtypeIntegers = [];

  ngOnInit(): void {
    this.apType = apModel.apTypeMap.get(this.typedPerson.apType);
    this.aspects = this.apType.name.split('');
    if (this.typedPerson.apSubtype) {
      this.subtypes = [];
      this.subtypeStrings = this.typedPerson.apSubtype.split('')
      this.subtypeStrings.forEach((subtype, index) => {
        const subtypeName = (index + 1) + '-' + subtype;
        const subTypeObj = apModel.subtypesMap.get(subtypeName);
        this.subtypeIntegers.push(parseInt(subtype, 10));
        if (!subTypeObj) {
          return;
        }
        this.subtypes.push({
          name: subtypeName,
          type: subTypeObj.type,
          highContrast: subTypeObj.highContrast,
          description: subTypeObj.description
        });
      });
    }
  }

  get abc() {
    let result = [];
    var arrows = [];
    // iterate through the subtypes on the typed person
    this.subtypeStrings.forEach((subtype, index) => {
      var indexes = [];
      // build lines for each starting subtype
      this.findNextLine(index, subtype, indexes);
      arrows.push(indexes);
    });
    arrows.forEach((indexes) => {
      result.push(indexes.join(' -> '));
    });
    return result;
  }

  /**
   * Given an index in the AP type and the SubType, add indexes to the list if they are not yet contained
   * in the list recursively.
   */
  findNextLine(apIndex, subtype, lineIndexes) {
    var subtypeIndex = parseInt(subtype, 10) - 1; // might be -1, in which case its obscured
    if (subtypeIndex >= 0 && subtypeIndex !== apIndex && !lineIndexes.includes(apIndex + 1)) { // subtype is neither obscured nor depth
      // the subtype points to another aspect

      lineIndexes.push(apIndex + 1);
      this.findNextLine(subtypeIndex, this.subtypeStrings[subtypeIndex], lineIndexes);
    } else {
      lineIndexes.push(apIndex + 1);
    }
  }
}
