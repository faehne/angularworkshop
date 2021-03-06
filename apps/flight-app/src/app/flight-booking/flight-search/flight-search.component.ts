/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import {Component, OnInit} from '@angular/core';
import {FlightService} from '@flight-workspace/flight-lib';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { flightsLoad, flightsLoaded, updateFlight } from '../+state/flight-booking.actions';
import { FlightBookingAppState } from '../+state/flight-booking.reducer';
import { selectedFilteredFlights, selectFlightsWithParam } from '../+state/flight-booking.selectors';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
})
export class FlightSearchComponent implements OnInit {
  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  flights$ = this.store.select(selectFlightsWithParam([5]));

  get flights() {
    return this.flightService.flights;
  }

  // "shopping basket" with selected flights
  basket: { [id: number]: boolean } = {
    3: true,
    5: true,
  };

  constructor(
    private flightService: FlightService,
    private store: Store<FlightBookingAppState>
  ) {}

  ngOnInit() {}

  search(): void {
    if (!this.from || !this.to) return;

    //this.flightService.load(this.from, this.to, this.urgent);
    /**
    this.flightService.find(this.from, this.to, this.urgent).subscribe({
      next: (flights) => {
        this.store.dispatch(flightsLoaded({ flights }));
      },
      error: (error) => {
        console.error('error', error);
      },
    });
    */
    this.store.dispatch(
      flightsLoad({
        from: this.from,
        to: this.to,
        urgent: this.urgent,
      })
    );
  }

  delay(): void {
    this.flights$.pipe(take(1)).subscribe((flights) => {
      const flight = flights[0];

      const oldDate = new Date(flight.date);
      const newDate = new Date(oldDate.getTime() + 15 * 60 * 1000);
      const newFlight = { ...flight, date: newDate.toISOString() };

      this.store.dispatch(updateFlight({ flight: newFlight }));
    });
  }
}
