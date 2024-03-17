import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  RegisterError:string='';
  RegisterSuccess:string='';

  constructor(private fb:FormBuilder,private api:ApiService, private loginrouter:Router){}

  registerForm=this.fb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    phno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  register(){

    if(this.registerForm.valid){
    console.log(this.registerForm.value);
    let username=this.registerForm.value.username
    let phno=this.registerForm.value.phno
    let password = this.registerForm.value.password
    console.log(username,phno,password);
    this.api.register(username,phno,password).subscribe((response:any)=>{
      console.log(response);
      alert(response.message)
      this.RegisterSuccess=response.message;
      setTimeout(()=>{
        //redirect to login page
      this.loginrouter.navigateByUrl('')
      },3000)
      
    },
    (response:any)=>{
      this.RegisterError=response.error.message;
      setTimeout(()=>{
        this.registerForm.reset();
        this.RegisterError='';
      },4000)
    }
    )
    
    

  }else{
    alert('invalid form')
  }
  }
}
