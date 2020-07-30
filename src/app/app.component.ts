import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Function } from './function.model';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ops-type-points';

  modalityString: string;
  s1String: string;
  s2String: string;
  animalString: string;

  modalities: string[];
  functions: Function[] = new Array<Function>();
  animals: { animal: string; savior: string }[];
  animalStack: string[];

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

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.modalityString = params.get('m') ? params.get('m') : 'FF';
      this.s1String = params.get('s1') ? params.get('s1') : 'Fe';
      this.s2String = params.get('s2') ? params.get('s2') : 'Se';
      this.animalString = params.get('a') ? params.get('a') : 'PCSB';
      // this.orderObj = { ...params.keys, ...params };
    });
    if (this.modalityString && this.s1String && this.s2String && this.animalString) {
      this.onSubmit();
    }
  }

  copyLinkTo() {
    console.log(location.href);
    var val = location.href;
    if (val.indexOf('?') < 0) {
      val += '?';
    }
    if (val.indexOf('m=') < 0) {
      val += "m=" + this.modalityString + '&';
    }
    if (val.indexOf('s1=') < 0) {
      val += "s1=" + this.s1String + '&';
    }
    if (val.indexOf('s2=') < 0) {
      val += "s2=" + this.s2String + '&';
    }
    if (val.indexOf('a=') < 0) {
      val += "a=" + this.animalString + '&';
    }
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  onSubmit() {
    this.modalities = this.modalityString.split('');
    this.animalStack = this.animalString.split('');
    this.functions = new Array<Function>();
    var jumper = false;
    if (this.animalStack[0] === 'P' || this.animalStack[0] === 'S') {
      jumper = true;
    }

    var lead = new Function(this.s1String, 'S1', 1);
    var aux;
    var tert;
    var demon1 = this.determineDemon(this.s2String);
    if (jumper) {
      aux = new Function(demon1, '', 2);
      tert = new Function(this.s2String, 'S2', 3);
    } else {
      aux = new Function(this.s2String, 'S2', 2);
      tert = new Function(demon1, '', 3);
    }
    var demon2 = this.determineDemon(this.s1String);
    var last = new Function(demon2, '', 4);

    this.functions.push(lead);
    this.functions.push(aux);
    this.functions.push(tert);
    this.functions.push(last);

    this.addActivations(this.animalStack);
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
            this.functions.forEach((f) => {});
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
