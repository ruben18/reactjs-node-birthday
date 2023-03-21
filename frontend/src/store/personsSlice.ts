import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store';

import { CounterState, Person } from '../types/types';

const initialState: CounterState = {
  persons: [],
  currentPerson: {name: '', surname: '', country: '', birthday: "", years: 0 }
}

export const personsSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    addPerson(state: any, action: PayloadAction<Person>){
        state.persons.push(action.payload);
        state.currentPerson = action.payload
    },
    setCurrentPerson(state: any, action: PayloadAction<Person>){
      console.log(action.payload)
      state.currentPerson = action.payload
    }
  },
})

export const { addPerson, setCurrentPerson } = personsSlice.actions

export const selectPersons = (state: RootState) => state.persons

export default personsSlice.reducer