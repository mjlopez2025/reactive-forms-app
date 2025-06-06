import { CountryService } from './../../services/country.service';
import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Country } from '../../interafces/country.interface';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent { 
  fb = inject(FormBuilder);
  CountryService = inject(CountryService);

  
  regions = signal(this.CountryService.regions);
  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);


  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

}
 