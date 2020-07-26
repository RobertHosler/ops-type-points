import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Function } from './function.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ops-type-points';

  modalityString: string = 'FM';
  s1String: string = 'Te';
  s2String: string = 'Se';
  animalString: string = 'PCSB';

  modalities: string[];
  functions: Function[] = new Array<Function>();
  animals: { animal: string; savior: string }[];

  playAnimal: { animal: string; savior: string }[] = [
    { animal: 'P', savior: 'S1' },
    { animal: 'C', savior: 'S2' },
    { animal: 'B', savior: 'A' },
    { animal: 'S', savior: '-' },
  ];
  blastAnimal: { animal: string; savior: string }[] = [
    { animal: 'B', savior: 'S1' },
    { animal: 'S', savior: 'S2' },
    { animal: 'P', savior: 'A' },
    { animal: 'C', savior: '-' },
  ];
  consumeAnimal: { animal: string; savior: string }[] = [
    { animal: 'C', savior: 'S1' },
    { animal: 'P', savior: 'S2' },
    { animal: 'S', savior: 'A' },
    { animal: 'B', savior: '-' },
  ];
  sleepAnimal: { animal: string; savior: string }[] = [
    { animal: 'S', savior: 'S1' },
    { animal: 'B', savior: 'S2' },
    { animal: 'C', savior: 'A' },
    { animal: 'P', savior: '-' },
  ];

  onSubmit(form: NgForm) {
    console.log(form.value);

    this.modalities = form.value.modalities.split('');
    var animalStack = form.value.animals.split('');
    this.functions = new Array<Function>();
    var jumper = false;
    if (animalStack[0] === 'P' || animalStack[0] === 'S') {
      jumper = true;
    }

    var lead = new Function(form.value.savior1, 'S1', 1);
    var aux;
    var tert;
    var demon1 = this.determineDemon(form.value.savior2);
    if (jumper) {
      aux = new Function(demon1, '', 2);
      tert = new Function(form.value.savior2, 'S2', 3);
    } else {
      aux = new Function(form.value.savior2, 'S2', 2);
      tert = new Function(demon1, '', 3);
    }
    var demon2 = this.determineDemon(form.value.savior1);
    var last = new Function(demon2, '', 4);

    this.functions.push(lead);
    this.functions.push(aux);
    this.functions.push(tert);
    this.functions.push(last);

    this.addActivations(animalStack);
    this.addModalities();

    console.log(this.functions);
  }

  addModalities() {
    this.functions.forEach((f, index) => {
      if (f.name.startsWith('S')) {
        f.modality = this.modalities[0];
      } else if (f.name.startsWith('N')) {
        f.modality = this.modalities[0] === 'F' ? 'M' : 'F';
      } else if (f.name.endsWith('e')) {
        f.modality = this.modalities[1]; //De
      } else if (f.name.endsWith('i')) {
        f.modality = this.modalities[1] === 'F' ? 'M' : 'F'; //Di
      }

      if ((index = 2)) {
      }
    });
  }

  addActivations(animalStack) {
    animalStack.forEach((a, index) => {
      var animalSavior;
      if (index === 1) {
        animalSavior = 'S2';
        this.animals.forEach((item) => {
          if (item.animal === a) {
            item.savior = animalSavior;
            return;
          }
        });
        //Activate the non savior function 
        switch (a) {
          case 'P':
            this.functions.forEach((f) => {

            });
        }
      } else if (index === 2) {
        animalSavior = 'A';
        this.animals.forEach((item) => {
          if (item.animal === a) {
            item.savior = animalSavior;
            return;
          }
        });
      } else if (index === 3) {
        animalSavior = '-';
        this.animals.forEach((item) => {
          if (item.animal === a) {
            item.savior = animalSavior;
            return;
          }
        });
        return;
      }
      switch (a) {
        case 'P':
          if (index === 0) {
            this.animals = this.playAnimal;
          }
          //Activate for play
          this.functions.forEach((f) => {
            if (
              f.name === 'Fe' ||
              f.name === 'Te' ||
              f.name === 'Ne' ||
              f.name === 'Se'
            ) {
              f.activation++;
              if (index === 1 && !f.savior) {
                f.savior = 'A';
              } else if (index === 2 && !f.savior) {
                f.savior = '-';
              }
            }
          });
          break;
        case 'C':
          if (index === 0) {
            this.animals = this.consumeAnimal;
          }
          this.functions.forEach((f) => {
            if (
              f.name === 'Fi' ||
              f.name === 'Ti' ||
              f.name === 'Ne' ||
              f.name === 'Se'
            ) {
              f.activation++;
              if (index === 1 && !f.savior) {
                f.savior = 'A';
              } else if (index === 2 && !f.savior) {
                f.savior = '-';
              }
            }
          });
          break;
        case 'B':
          if (index === 0) {
            this.animals = this.blastAnimal;
          }
          this.functions.forEach((f) => {
            if (
              f.name === 'Fe' ||
              f.name === 'Te' ||
              f.name === 'Ni' ||
              f.name === 'Si'
            ) {
              f.activation++;
              if (index === 1 && !f.savior) {
                f.savior = 'A';
              } else if (index === 2 && !f.savior) {
                f.savior = '-';
              }
            }
          });
          break;
        case 'S':
          if (index === 0) {
            this.animals = this.sleepAnimal;
          }
          this.functions.forEach((f) => {
            if (
              f.name === 'Fi' ||
              f.name === 'Ti' ||
              f.name === 'Ni' ||
              f.name === 'Si'
            ) {
              f.activation++;
              if (index === 1 && !f.savior) {
                f.savior = 'A';
              } else if (index === 2 && !f.savior) {
                f.savior = '-';
              }
            }
          });
          break;
      }
    });
  }

  determineDemon(savior) {
    var demon;
    switch (savior) {
      case 'Fe':
        demon = 'Ti';
        break;
      case 'Te':
        demon = 'Fi';
        break;
      case 'Fi':
        demon = 'Te';
        break;
      case 'Ti':
        demon = 'Fe';
        break;
      case 'Ne':
        demon = 'Si';
        break;
      case 'Se':
        demon = 'Ni';
        break;
      case 'Ni':
        demon = 'Se';
        break;
      case 'Si':
        demon = 'Ne';
        break;
      default:
      //ERROR
    }
    return demon;
  }

  onClear() {
    this.modalityString = '';
    this.s1String = '';
    this.s2String = '';
    this.animalString = '';
  }
}
