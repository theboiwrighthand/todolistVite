import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  whichStatusWantMap : null
}

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    changeStatus: (state,actions) => {
      state.whichStatusWantMap = actions.payload
    },
  },
})

export const { changeStatus} = chartSlice.actions

export default chartSlice.reducer