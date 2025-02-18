const UBER_FLOW_COORD_REQUIRED = [
  'uber_rider:fare_estimate',
  'uber_rider:ucomponent_api_checkout',
];

export const getArgs = (alias: string) => {
  if (UBER_FLOW_COORD_REQUIRED.includes(alias)) {
    return {
      pickup_latitude: 40.33276382356346,
      pickup_longitude: -3.8580982818840535,
      destination_latitude: 40.36560098237766,
      destination_longitude: -3.5985462938409354,
    };
  }
  return null;
};
