import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {OPACITY_API_KEY} from '../constants';

export interface ConnectionDataState {
  apiKey: string;
  platforms: Platforms;
}

const initialState: ConnectionDataState = {
  apiKey: OPACITY_API_KEY,
  platforms: [],
};

export const connectionDataSlice = createSlice({
  name: 'connectionData',
  initialState,
  reducers: {
    setApiKeyState(state, action: PayloadAction<string>) {
      state.apiKey = action.payload;
    },
    setPlatforms(state, action: PayloadAction<Platforms>) {
      state.platforms = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setApiKeyState, setPlatforms} = connectionDataSlice.actions;

export default connectionDataSlice.reducer;
