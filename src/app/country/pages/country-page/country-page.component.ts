import { Country } from './../../interafces/country.interface';
import { CountryService } from './../../services/country.service';
import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';import { filter, switchMap, tap } from 'rxjs';

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


  onFormChanged = effect(( onCleanup) => {

  const regionSubscription = this.onRegionChanged();
  const countrySubscription = this.onCountryChanged();
    
    onCleanup(() => {
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
    });
  });

  onRegionChanged() {
    return this.myForm
    .get('region')!
    .valueChanges.pipe(
      tap(() => this.myForm.get('country')!.setValue('')),
      tap(() => this.myForm.get('country')!.setValue('')),
      tap(() => {
        this.borders.set([]);
        this.countriesByRegion.set([]);
      }),
      switchMap((region) => this.CountryService.getCountriesByRegion(region ?? '')),
    )
    .subscribe( (Countries) => {
        this.countriesByRegion.set(Countries);
      });
  }

  onCountryChanged() {
    return this.myForm.get('country')!.valueChanges
    .pipe(
      tap(() => this.myForm.get('border')!.setValue('')),
      filter(value => value!.length > 0),
      switchMap( alphaCode => 
        this.CountryService.getCountryByAlphaCode(alphaCode ?? '')
    ),
    switchMap(country => this.CountryService.getCountryNameByCodeArray(country.borders))
      
    )
    .subscribe((borders) => {
      console.log( {borders})
    })
  }
}