import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'flight-workspace-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {
  ngOnInit(): void {
    sessionStorage.setItem('test', 'holger');
  }
}
