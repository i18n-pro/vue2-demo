import Vue from 'vue'
import {createI18n} from '@i18n-pro/vue2'
import App from './App.vue'
import initI18nState from './i18n'

async function init() {
  const params = new URLSearchParams(
    new URLSearchParams(window.location.search.slice(1)),
  )
  const locale = params.get('locale') || 'en'

  const langs = initI18nState.langs || {}
  if (locale !== 'zh') {
    const lang = await (await fetch(`../i18n/${locale}.json`)).json()
    langs[locale] = lang
  }

  const i18n = createI18n({
    ...initI18nState,
    langs,
    locale,
    with$:false,
  })

  Vue.use(i18n)

  new Vue({
    el: '#app',
    render: h => h(App)
  })
}

init()
