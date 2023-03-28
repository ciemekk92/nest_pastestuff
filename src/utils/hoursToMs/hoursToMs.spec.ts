import { hoursToMs } from './hoursToMs';

describe('hoursToMs', () => {
  it('should convert passed hours to miliseconds', () => {
    expect(hoursToMs(1)).toEqual(3600000);
  });
});
