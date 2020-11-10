import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Input() postleitzahl = '';

  form = this.fb.group(
    {
      vorname: [
        '',
        [
          Validators.required,
          Validators.pattern('[A-Z][a-z]*'),
          (c: AbstractControl) =>
            c.value.length > 4 ? { custom: true } : null,
        ],
      ],
      name: ['', [Validators.required]],
      nachname: ['', [Validators.required, Validators.pattern('[A-Z][a-z]*')]],
      adresse: ['', [Validators.required]],
      postleitzahl: ['', [Validators.required]],
      ort: [''],
      land: [''],
    },
    {
      validators: [
        (fg) =>
          fg.get('ort').value.length > 0 && fg.get('land').value.length > 0
            ? null
            : { ortland: true },
      ],
    }
  );

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => this.cd.detectChanges());
  }

  get vorname() {
    return this.form.get('vorname');
  }
}
