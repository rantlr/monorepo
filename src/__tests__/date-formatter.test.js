import formatDate from '../date-formatter';

const dateString = '2018-11-17T15:19:52.675Z';
const date = new Date(dateString);
const expectedFormat = '16:19:52 on Saturday November 17th 2018';

describe('formatting a date', () => {
  it('should work for a Date object', () => {
    expect(formatDate(date)).toBe(expectedFormat);
  });

  it('should work for a string', () => {
    expect(formatDate(dateString)).toBe(expectedFormat);
  });
});
