import moment from 'moment';

export const DateHelper = {
  addMonths: (period, date = moment()) => date.add(period, 'month'),
};
