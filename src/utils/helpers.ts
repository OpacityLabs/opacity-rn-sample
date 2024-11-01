const UBER_FLOW_PARAM_REQUIRED = [
  'uber:driver:read:trips',
  'uber:rider:read:trip',
  'uber:rider:read:trip_history',
];

const UBER_FARE_ALIAS = 'uber:rider:read:fare_estimate';

export const getArgs = (alias: string) => {
  if (alias === UBER_FARE_ALIAS) {
    return [45.46372, 9.18839, 45.46369, 9.18851];
  }
  if (UBER_FLOW_PARAM_REQUIRED.includes(alias)) {
    let date = new Date();
    date.setDate(date.getDate() - 5);
    return [date.toLocaleString(), new Date().toLocaleString(), ''];
  }
  return [];
};
