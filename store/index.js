import axios from 'axios'

export const state = () => ({
  authUser: null,
  login: false,
  register: true,
  closeAuth: false,
  toggleChat: false,
  rooms: [],
  carts: ''
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  },
  CLOSE_AUTH: function (state) {
    console.log(state.closeAuth)
    state.closeAuth = false
  },
  OPEN_LOGIN: function (state) {
    state.closeAuth = true
    state.login = true
  },
  OPEN_REGISTER: function (state) {
    state.closeAuth = true
    state.login = false
  },
  LIST_CART: function (state, carts) {
    state.carts = carts
  },
  TOGGLE_CHAT: function (state) {
    state.toggleChat = !state.toggleChat
  },
  CHANGE_ROOM :function(state , room){
    var index = state.rooms.indexOf(room)
    Object.assign(state.rooms[index],room)
    console.log(state.rooms)
  },
  ADD_TO_CART: function (state, cart) {
    state.carts += cart  
    console.log(state.carts)
  },
  ADD_CART: function (state, cart) {
    state.carts += 1  
    console.log(state.carts)
  },
  REDUC_CART: function (state, cart) {
    state.carts -= 1  
    console.log(state.carts)
  },
  DELETE_CART: function (state, cart) {
    state.carts -= cart  
    console.log(state.carts)
  },
  ROOMS: function (state, rooms) {
    state.rooms = rooms
  },
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.user) {
      commit('SET_USER', req.user)
    }
  },
  async login({ commit }, { username, password }) {
    try {
      const { data } = await axios.post('/api/login', { username, password })
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async logout({ commit }) {
    await axios.post('/api/logout')
    commit('SET_USER', null)
  }

}
export const strict = false