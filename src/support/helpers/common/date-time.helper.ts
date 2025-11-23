import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);

export class DateTimeHelper {
  private readonly _time: dayjs.Dayjs;

  private constructor(time: dayjs.Dayjs) {
    this._time = time.utc();
  }

  public static now(): DateTimeHelper {
    return new DateTimeHelper(dayjs());
  }

  public static fromDayjs(time: dayjs.Dayjs): DateTimeHelper {
    return new DateTimeHelper(time);
  }

  public static fromDate(date: Date): DateTimeHelper {
    return new DateTimeHelper(dayjs(date));
  }

  // MANIPULATION
  /**
   * Add user defined number of units to time
   * @param {number} amount Offset from now
   * @param {Unit} unit Enum of values
   */
  public inFuture(amount: number, unit: Unit): DateTimeHelper {
    return DateTimeHelper.fromDayjs(this._time.add(amount, unit).startOf('day'));
  }

  /**
   * Subtract user defined number of units from time
   * @param {number} amount Offset from now
   * @param {Unit} unit Enum of values
   */
  public inPast(amount: number, unit: Unit): DateTimeHelper {
    return DateTimeHelper.fromDayjs(this._time.subtract(amount, unit).startOf('day'));
  }

  // FIXED TIME
  public today(): DateTimeHelper {
    return DateTimeHelper.fromDayjs(this._time.startOf('day'));
  }

  public tomorrow(): DateTimeHelper {
    return DateTimeHelper.fromDayjs(this._time.add(1, Unit.DAY).startOf('day'));
  }

  public inAWeek(): DateTimeHelper {
    return DateTimeHelper.fromDayjs(this._time.add(7, Unit.DAY).startOf('day'));
  }

  public inAMonth(): DateTimeHelper {
    return DateTimeHelper.fromDayjs(this._time.add(1, Unit.MONTH).startOf('day'));
  }

  public inAYear(): DateTimeHelper {
    return DateTimeHelper.fromDayjs(this._time.add(1, Unit.YEAR).startOf('day'));
  }

  public secondsAgo(seconds: number): DateTimeHelper {
    return DateTimeHelper.fromDayjs(this._time.subtract(seconds, Unit.SECOND));
  }

  public hoursAgo(hours: number): DateTimeHelper {
    return DateTimeHelper.fromDayjs(this._time.subtract(hours, Unit.HOUR));
  }

  public minutesAgo(minutes: number): DateTimeHelper {
    return DateTimeHelper.fromDayjs(this._time.subtract(minutes, Unit.MINUTE));
  }

  public yesterday(): DateTimeHelper {
    return DateTimeHelper.fromDayjs(this._time.subtract(1, Unit.DAY).startOf('day'));
  }

  public weekAgo(): DateTimeHelper {
    return DateTimeHelper.fromDayjs(this._time.subtract(7, Unit.DAY).startOf('day'));
  }

  public twoWeeksAgo(): DateTimeHelper {
    return DateTimeHelper.fromDayjs(this._time.subtract(14, Unit.DAY).startOf('day'));
  }

  public monthAgo(): DateTimeHelper {
    return DateTimeHelper.fromDayjs(this._time.subtract(1, Unit.MONTH).startOf('day'));
  }

  public twoMonthsAgo(): DateTimeHelper {
    return DateTimeHelper.fromDayjs(this._time.subtract(2, Unit.MONTH).startOf('day'));
  }

  public threeMonthsAgo(): DateTimeHelper {
    return DateTimeHelper.fromDayjs(this._time.subtract(3, Unit.MONTH).startOf('day'));
  }

  public sixMonthsAgo(): DateTimeHelper {
    return DateTimeHelper.fromDayjs(this._time.subtract(6, Unit.MONTH).startOf('day'));
  }

  public yearAgo(): DateTimeHelper {
    return DateTimeHelper.fromDayjs(this._time.subtract(1, Unit.YEAR).startOf('day'));
  }

  //returns the full name of the month
  public getLongMonthName(): string {
    return this._time.format('MMMM').toString();
  }

  public getShortMonthName(): string {
    return this._time.format('MMM').toString();
  }

  public getCountOfDaysFromNow(targetDate: dayjs.Dayjs): number {
    return Math.abs(targetDate.diff(dayjs(), Unit.DAY));
  }

  public getDayInMonth(): number {
    return this._time.date();
  }

  // RETURN FORMATS
  public toISOString(): string {
    return this._time.toISOString();
  }

  /**
   * Format the resulting time with a user-defined format.
   * @param {string} customFormat - User-defined format. Defaults to 'YYYY-MM-DDTHH:00:00'.
   * @returns {string} Formatted date-time string.
   */
  public toCustomFormat(customFormat: string = 'YYYY-MM-DDTHH:00:00'): string {
    return this._time.format(customFormat);
  }

  /**
   * Get now in Date format
   * @returns Date with now value
   */
  public toDate(): Date {
    return this._time.toDate();
  }

  get time(): dayjs.Dayjs {
    return this._time;
  }

  // COMPARISON
}

export enum Unit {
  YEAR = 'year',
  MONTH = 'month',
  DAY = 'day',
  HOUR = 'hour',
  MINUTE = 'minute',
  SECOND = 'second',
  MILLIS = 'millisecond',
}
