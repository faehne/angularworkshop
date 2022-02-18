import { flightBookingReducer, initialState } from './flight-booking.reducer';

describe('FlightBooking Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = flightBookingReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
