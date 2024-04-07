import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { GraphqlService } from '../network/graphql.service';
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSelectModule, MatIconModule, RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{

  employees: Employee[] = []
  dataSource = new MatTableDataSource<Employee>();
  userID: string = ''

  // firstName: string = ''
  // lastName: string = '';
  // email: string = '';
  // gender: string = '';
  // salary: number = 0;


  constructor(private graphqlAPI: GraphqlService, private route: Router) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.graphqlAPI.getAllEmployee().subscribe(
      ({ employees, firstEmployeeId }) => {
        this.employees = employees;
        this.userID = firstEmployeeId;
      },
      error => console.error('Error fetching employees:', error)
    );
  }

  viewEmployee(employeeId: string): void {
    this.route.navigate(['/view', employeeId]); // Navigate to view component with employee ID
  }


  deleteEmployee(employeeID: string): void{
    this.userID = employeeID
    this.graphqlAPI.deleteEmployeeByID(this.userID).subscribe((response: any) => {
      if (response && response.data && response.data.deleteEmployeeById){
        location.reload();
      }else{
        console.log(response.data)
      }
    }, error => {
      console.log("Error:", error)
    })
  }


  // createUser(): void {
  //   // Make HTTP POST request to add new employee
  //   this.graphqlAPI.addEmployee(this.firstName, this.lastName, this.email, this.gender, this.salary)
  //     .subscribe((response: any) => {
  //       // Upon successful creation, navigate back to the main screen
  //       this.route.navigate(['/create']);
  //     }, error => {
  //       console.log("Error creating user:", error);
  //     });
  //   }



}