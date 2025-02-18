import {RootState} from '../store';

export const apiKeySelector = (state: RootState) => state.connectionData.apiKey;
export const hasApiKeySelector = (state: RootState) =>
  !!state.connectionData.apiKey;
export const platformsSelector = (state: RootState) =>
  state.connectionData.platforms;

export const platformSelector = (state: RootState, id: string) =>
  state.connectionData.platforms.find(platform => platform.id === id);
export const resourceSelector = (
  state: RootState,
  platformId: string,
  resourceId: string,
) =>
  state.connectionData.platforms
    .find(platform => platform.id === platformId)
    ?.flows.find(resource => resource.id === resourceId);
