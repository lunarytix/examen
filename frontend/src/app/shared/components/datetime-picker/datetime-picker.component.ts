import { Component, Input, OnInit, ViewChild, Output, EventEmitter, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,

})
export class DatetimePickerComponent implements OnInit {
  @ViewChild('picker') picker: any;
  @Output("cambioFecha") cambioFecha = new EventEmitter<FormGroup>();
  @Input("fecha") fecha: moment.Moment = moment(new Date());
  @Input("disabled") disabled = false;
  @Input("showSpinners") showSpinners = true;
  @Input("showSeconds") showSeconds = false;
  @Input("touchUi") touchUi = true;
  @Input("enableMeridian") enableMeridian = true;
  @Input("minDate") minDate: moment.Moment | undefined;
  @Input("maxDate") maxDate: moment.Moment | undefined;
  @Input("stepHour") stepHour = 1;
  @Input("stepMinute") stepMinute = 1;
  @Input("stepSecond") stepSecond = 1;
  @Input("color") color: ThemePalette = 'primary';

  frmFecha = this.fb.group({
    fecha: [this.fecha,[Validators.required,Validators.nullValidator]]
  });

  constructor(
    private fb: FormBuilder
  ) {
    this.frmFecha.get('fecha')?.valueChanges.subscribe( e => {
      if (!e) {
        return this.cambioFecha.emit(undefined);
      }
      this.cambioFecha.emit(this.frmFecha);
    });

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    const valores = changes?.['fecha'].currentValue;
    this.frmFecha.controls['fecha'].setValue(valores);
  }


}
