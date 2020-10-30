var _ = require('underscore')

export const state = () => ({
  appVersion: '1.0.0',
  theme: [],
  specialpromotions: [],
  setting: null,
  themeObject: {
    color: null,
    background: null,
  },
})

const API_URL = process.env.API + 'backend'

export const mutations = {
  SET_APP_VERSION(state, version) {
    state.appVersion = version
  },
  SET_THEME(state, theme) {
    state.theme = theme
  },
  SET_SETTING(state, setting) {
    state.setting = setting
  },
  SET_PROMOTIONS(state, specialpromotions) {
    state.specialpromotions = specialpromotions
  },
  SET_THEME_COLOR(state, color) {
    state.themeObject.color = color
  },
  SET_THEME_BACKGROUND(state, background) {
    state.themeObject.background = background
  },
}

export const getters = {
  getThemeObject(state) {
    return _.indexBy(state.theme, 'id')
  },
  getSettingObject(state) {
    return state.setting
  },
  getPromotionObjects(state) {
    return _.indexBy(state.specialpromotions, 'id')
  },
  getPromotionActives(state) {
    let promotions = state.specialpromotions.filter((item) => {
      return item.status == 1
    })
    return _.indexBy(promotions, 'id')
  },
  getPromotionArray(state) {
    return state.specialpromotions
  },
  getThemeObjectColor(state) {
    return state.themeObject.color
  },
  getThemeObjectBackground(state) {
    return state.themeObject.background
  },
}

export const actions = {
  async nuxtServerInit({ dispatch, commit, state }, { req }) {
    // Get session ID:
    console.log('>>>> API_URL: [IN nuxtServerInit] ', API_URL)
    console.log('>>>> API: [IN nuxtServerInit] ', process.env.API)
    console.log('>>>> _API: [IN nuxtServerInit] ', process.env._API)
    console.log('>>>> SITE_NAME: [IN nuxtServerInit] ', process.env.SITE_NAME)
    commit('SET_APP_VERSION', process.env.APP_VERSION)
    const { version } = await this.$axios.$get(API_URL + '/api/get-version')
    await dispatch('GET_SPECIAL')

    if (this.$cookies.get('theme-color')) {
      await dispatch('SET_THEME_COLOR', this.$cookies.get('theme-color'))
      await dispatch('SET_THEME_BACKGROUND', this.$cookies.get('theme-background'))
    } else {
      await dispatch('SET_THEME_COLOR', process.env.THEME_COLOR || 'greenlight-theme')
      await dispatch('SET_THEME_BACKGROUND', '')
    }

    if (!req.session.theme || !req.session.setting || req.session.setting.version != version) {
      await dispatch('GET_THEMES')
      req.session.theme = state.theme
      req.session.setting = state.setting
    } else {
      commit('SET_SETTING', req.session.setting)
      commit('SET_THEME', req.session.theme)
    }
  },
  async SET_THEME_COLOR({ commit }, color) {
    this.$cookies.set('theme-color', color)
    commit('SET_THEME_COLOR', color)
  },
  async SET_THEME_BACKGROUND({ commit }, background) {
    this.$cookies.set('theme-background', background)
    commit('SET_THEME_BACKGROUND', background)
  },
  async GET_THEMES({ commit }) {
    const { theme, data, link_front } = await this.$axios.$get(API_URL + '/api/get-setting')
    const themeArray = await _.map(theme, (item) => {
      item.img = process.env.API + 'backend/web/themes/' + item.img
      return item
    })
    commit('SET_THEME', themeArray)
    commit('SET_SETTING', { ...data, link_front })
  },
  async GET_SPECIAL({ commit }) {
    const { data } = await this.$axios.$get(API_URL + '/api/get-promotion/special')
    const promotionArray = await _.map(data, (item) => {
      item.status = Number(item.status)
      item.img_banner = API_URL + 'backend/web/special_promotions/' + item.img_banner
      return item
    })
    console.log('>>>> API: [IN GET_SPECIAL] ', process.env.API)
    console.log('>>>> SITE_NAME: [IN GET_SPECIAL] ', process.env.SITE_NAME)
    commit('SET_PROMOTIONS', promotionArray)
  },
}
