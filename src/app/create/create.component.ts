import { Component } from '@angular/core';
import { GraphqlService } from '../network/graphql.service';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  firstName: string = ''
  lastName: string = '';
  email: string = '';
  gender: string = '';
  salary: number = 0;

  constructor(private graphqlAPI: GraphqlService, private route: Router) {}

  createUser(): void {
    // Make HTTP POST request to add new employee
    this.graphqlAPI.addEmployee(this.firstName, this.lastName, this.email, this.gender, this.salary)
      .subscribe((response: any) => {
        if(response && response.data && response.data.addEmployee){
          this.route.navigate(['/main']);
        }
      }, error => {
        console.log("Error creating user:", error);
      });
    }

}
