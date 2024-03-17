import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  phoneNumber:any
  loginSuccess:boolean=false
  loginError:string='';

  constructor(private fb:FormBuilder,private api:ApiService,private loginRouter:Router){}

  ngOnInit(): void {
    localStorage.clear()
  }

  loginForm=this.fb.group({
    phno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  login(){
    if(this.loginForm.valid){
      let phno=this.loginForm.value.phno
      let password =  this.loginForm.value.password
      this.api.login(phno,password).subscribe((result:any)=>{
        this.loginSuccess=true
        alert('login successfull')
        this.loginSuccess=result.message
        console.log(result);
        this.phoneNumber=result.response.phno
        console.log(this.phoneNumber);
        localStorage.setItem('phno',this.phoneNumber)
        
        setTimeout(() => {
          this.loginRouter.navigateByUrl('/home')

        }, 2000);

      },
      (response:any)=>{
        this.loginError=response.error.message
        setTimeout(()=>{
          this.loginForm.reset();
          this.loginError=''
        },2000)
      }
      )
    }else{
      alert('kindly login')
    }
  }
}
