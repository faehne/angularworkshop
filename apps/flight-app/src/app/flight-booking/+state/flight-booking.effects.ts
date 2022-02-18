import { Injectable } from '@angular/core';
import { FlightService } from '@flight-workspace/flight-lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { flightsLoad, flightsLoaded, flightsLoadedError } from './flight-booking.actions';


// No other imports, for now

@Injectable()
export class FlightBookingEffects {
  loadFlights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(flightsLoad),
      switchMap((a) =>
        this.flightService.find(a.from, a.to, a.urgent).pipe(
          map((flights) => flightsLoaded({ flights })),
          catchError((err) =>
            of(flightsLoadedError({ error: err }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private flightService: FlightService
  ) {}
}

