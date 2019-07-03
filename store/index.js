import axios from 'axios'

export const state = () => ({
  authUser: null,
  login: false,
  register: true,
  closeAuth: false,
  toggleChat:false,
  rooms:[],
  carts : []
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
  LIST_CART: function (state ,carts) {
    state.carts = carts
  },
  TOGGLE_CHAT: function (state) {
    state.toggleChat = !state.toggleChat
  },
  ADD_CART: function (state ,cart) {
    console.log(cart)
    console.log(state.carts)
    var index = -1;
    state.carts.forEach((subcate, index) => {
        if (subcate.id === cart.id) {
          subcate.users[0].carts.qty + 1 
          index = index;
        }
    });
  },
  ROOMS: function (state ,rooms) {
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