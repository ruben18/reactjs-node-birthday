import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store';

import { CounterState, Person } from '../types/types';

const initialState: CounterState = {
  persons: []
}

export const personsSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    addPerson(state: any, action: PayloadAction<Person>){
        state.persons.push(action.payload);
    }
  },
})

export const { addPerson } = personsSlice.actions

export const selectPersons = (state: RootState) => state.persons

export default personsSlice.reducer