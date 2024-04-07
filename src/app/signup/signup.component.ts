import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlService } from '../network/graphql.service';
import { response } from 'express';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  username: string = '';
  email: string = '';
  password: string = '';
  

  constructor(private router: Router, private graphqlAPI: GraphqlService){}

  signup(): void {
    this.graphqlAPI.userSignUp(this.username, this.email, this.password).subscribe(
      (response: any) => {
        if (response && response.data && response.data.signUp) {
          // Handle successful signup, e.g., navigate to login page
          this.router.navigate(['/login']);
        } else {
          console.log("Failed to signup");
        }
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }


}