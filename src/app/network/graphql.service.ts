import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable } from 'rxjs';
import { map, multicast } from 'rxjs/operators';
import { Employee } from '../models/employee';
import { ViewComponent } from '../view/view.component';


@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  private api = "https://agreeable-tick-loafers.cyclic.app/graphql"


  constructor(private https: HttpClient) { }

  userLogin(username: string, password: string): Observable<any>{
    const query = `query{
      logIn(login: "${username}", password: "${password}")
  }`;

  return this.https.post(this.api, {query})
  }

  userSignUp(username: string, email: string, password: string): Observable<any>{
    const mutation = `mutation{
      signUp(username:"${username}", email:"${email}", password: "${password}"){
        id
        username
        email
        password
      }
  }`;

  return this.https.post(this.api, {mutation})
  }

  getAllEmployee(): Observable<{ employees: Employee[], firstEmployeeId: string }> {
    const query = `query {
      getAllEmployee {
        id
        first_name
        last_name
        email
        gender
        salary
      }
    }`;

    return this.https.post<any>(this.api, { query }).pipe(
      map(response => {
        const employees: Employee[] = response.data.getAllEmployee;
        const firstEmployeeId: string = employees.length > 0 ? employees[0].id : '';
        return { employees, firstEmployeeId };
      })
    );
  }
  

  getEmployeeDetails(employeeId: string): Observable<Employee> {
    const query = `query{
      getEmployeeById(id:"${employeeId}"){
          first_name
          last_name
          email
          gender
          salary
      }
  }`;

  return this.https.post<any>(this.api, {query, variables: {id: employeeId}}).pipe(
    map(response => response.data.getEmployeeById)
  )
}

addEmployee(first_name: string, last_name: string, email: string, gender: string, salary: number): Observable<Employee>{
  const mutation = `mutation {
    addEmployee(
      first_name: "${first_name}", 
      last_name: "${last_name}",
      email: "${email}", 
      gender: "${gender}", 
      salary: ${salary}) {
      first_name
      last_name
      email
      gender
      salary
    }
  }`;

  return this.https.post<any>(this.api, { mutation }).pipe(
    map(response => response.data.addEmployee)
  );
}

  deleteEmployeeByID(userID: string): Observable<any>{
    const mutation = `mutation {
      deleteEmployeeById(id: "${userID}")
    }`;
  
    return this.https.post(this.api, { query: mutation });
  }
}