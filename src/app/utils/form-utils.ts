import { AbstractControl, AsyncValidatorFn, FormArray, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { of, delay, map } from "rxjs";

export function customEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    // Regex muy simple que valida el formato básico de un email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{3,}$/;

    if (!value || emailRegex.test(value)) {
      return null;
    }

    return { customEmail: 'El valor ingresado no luce como un correo electrónico válido.' };
  };
}

// ✅ Validación ASINCRÓNICA que simula consulta a backend
export function emailValidatorAsync(): AsyncValidatorFn {
  return (control: AbstractControl): any => {
    const value = control.value;

    return of(value).pipe(
      delay(2500), // simula 2.5 segundos de espera
      map((email: string) => {
        const forbiddenEmails = ['test@test.com'];
        if (forbiddenEmails.includes(email.toLowerCase())) {
          return { emailExists: true };
        }
        return null;
      })
    );
  };
}

export class FormUtils {

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9_.%+-]+@[a-z0-9-]+\\.[a-z]{1-4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

    

  static getTextError(errors: ValidationErrors){
    for( const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido.';
        case 'minlength':
          return `Minimo de ${errors['minlength'].requiredLength} caracteres.`;
        case 'min':
          return `Valor minimo de ${errors['min'].min}.`;
        case 'email':
          return `El valor ingresado no es un correo electronico.`;

          case 'pattern':
            if( errors['pattern'].requiredPattern === FormUtils.emailPattern ) {
              return 'El valor ingresado no luce como un correo eletrónico .';
            }
            return 'Error de patron contra expresion regular.'
        default:
          return 'El valor ingresado no es un correo electronico.';
      }
    }
    return null;
  }

  static isValidField( form: FormGroup, fieldName: string) : boolean | null {
    return (
      !! form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  };


  static getFieldError( form: FormGroup, fieldName: string ): string | null {
    if( !form.controls[ fieldName ]) return null;

    const errors = form.controls[ fieldName ].errors ?? {};

    return FormUtils.getTextError(errors);
  };


  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }


  static getFieldErrorInArray( formArray: FormArray, index: number ): string | null {
    if( formArray.controls.length === 0) return null;

    const errors = formArray.controls[ index ].errors ?? {};

    return FormUtils.getTextError(errors);    
  };



  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return ( formGrup: AbstractControl) => {
      const field1Value = formGrup.get(field1)?.value;
      const field2Value = formGrup.get(field2)?.value;

      return field1Value === field2Value ? null : { passwordsNotEqual: true };
    };
  }

  
  static async checkingServerResponse(control: AbstractControl):Promise<ValidationErrors | null> {
    console.log('Validando contra el servidor');
    
    const formValue = control.value;

    if (formValue === 'hola@mundo.com') {
      return {
        emailTaken: true,
      }
    }
    return null;
  }

  
  

}
