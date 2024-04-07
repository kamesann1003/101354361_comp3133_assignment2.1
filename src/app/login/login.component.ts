import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlService } from '../network/graphql.service';
import { error } from 'console';
import { FormsModule } from '@angular/forms'; // Import FormsModule


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private router: Router, private graphqlAPI: GraphqlService){}

  login(): void{
    event?.preventDefault();
    this.graphqlAPI.userLogin(this.username, this.password).subscribe((response: any) => {
      if (response && response.data && response.data.logIn){
        console.log(response.data)
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/main'])
      }else{
        console.log("failed to login")
      }
    }, error => {
      console.log("Error:", error)
    })
  }
  

  navigateToSignup(): void {
    this.router.navigate(['/signup'])
  }
}