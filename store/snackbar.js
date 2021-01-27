export const state = () => ({
  content: '',
  color: '',
  args: {}
})

export const mutations = {
  showMessage(state, payload) {
    state.content = payload.message
    state.color = payload.color || '',
    state.args = payload.args || {}
  }
}