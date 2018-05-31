export const UPDATE_SELECTED_ITEM = (state, selectedItem) => {
  state.selectedItem = selectedItem
}

export const CLEAR_ALL_DATA = (state) => {


  state.selectedItem = []


}
