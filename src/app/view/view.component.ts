import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GraphqlService } from '../network/graphql.service';
import { Employee } from '../models/employee';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-view',
  standalone: true,
  imports: [NgIf],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})

export class ViewComponent implements OnInit {

  employee: Employee | undefined;

  constructor(private route: ActivatedRoute, private graphqlService: GraphqlService) { }

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id'); // Get employee ID from route parameters
    if (employeeId) {
      this.graphqlService.getEmployeeDetails(employeeId).subscribe(
        employee => this.employee = employee,
        error => console.error('Error fetching employee details:', error)
      );
    }
  }

}