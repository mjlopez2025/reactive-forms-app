import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { customEmailValidator, emailValidatorAsync } from '../../../utils/form-utils';


@Component({ 
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})

export class RegisterPageComponent { 
  fb = inject(FormBuilder);
  formUtils = FormUtils

  myForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(FormUtils.namePattern)]],

    email: new FormControl(
  '',
  [Validators.required, customEmailValidator()],
  [emailValidatorAsync()]
),

    username: ['', [Validators.required, Validators.minLength(6), Validators.pattern(FormUtils.notOnlySpacesPattern), FormUtils.notStrider,]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', Validators.required],
  }, {
    validators: [FormUtils.isFieldOneEqualFieldTwo('password', 'password2')]    
  });
 
  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
  }

}