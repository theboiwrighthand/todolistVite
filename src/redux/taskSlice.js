import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  taskItem: [],
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTaskToList: (state,actions) => {
      state.taskItem = actions.payload
    },
  },
})

export const { addTaskToList} = taskSlice.actions

export default taskSlice.reducer