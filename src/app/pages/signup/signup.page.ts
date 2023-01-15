import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  // signupForm: FormGroup;
  name!: string;
  email!: string;
  password!: string;
  cpf!: string;

  constructor() {
    (private fireAuth: AngularFireAuth)
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#\$%\^&\*])(?=.{6,})')]),
      confirmPassword: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required, Validators.pattern('^([0-9]{11}|[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})$')])
    });
   }

  ngOnInit() {
    this.signupForm.valueChanges.subscribe(() => {
      if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
        this.signupForm.controls['confirmPassword'].setErrors({'mismatch': true});
      } else {
        this.signupForm.controls['confirmPassword'].setErrors(null);
      }
    });
  }

  signup() {
    if (this.signupForm.valid) {
      if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
        console.log('As senhas não conferem.');
        return;
      }
      this.fireAuth.createUserWithEmailAndPassword(this.signupForm.value.email, this.signupForm.value.password)
        .then(user => {
          console.log('Usuário criado com sucesso');
          this.fireAuth.currentUser.updateProfile({
            displayName: this.signupForm.value.name
          });
        })
        .catch(error? => {
          console.log(error);
        });
    } else {
      console.log('Formulário inválido');
    }
  }

}
