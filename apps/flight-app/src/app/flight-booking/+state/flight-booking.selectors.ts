import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFlightBooking from './flight-booking.reducer';

export const selectFlightBookingState = createFeatureSelector<fromFlightBooking.State>(
  fromFlightBooking.flightBookingFeatureKey
);

// Use feature selector to get data from feature branch
export const selectFlights = createSelector(
  selectFlightBookingState,
  (s) => s.flights
);

export const negativeList = createSelector(
  selectFlightBookingState,
  (s) => s.negativeList
);

export const selectedFilteredFlights = createSelector(
  selectFlights,
  negativeList,
  (flights, negativeList) => flights.filter((f) => !negativeList.includes(f.id))
);

export const selectFlightsWithParam = (blockedFlights: number[]) =>
  createSelector(selectFlights, (flights) =>
    flights.filter((f) => !blockedFlights.includes(f.id))
  );