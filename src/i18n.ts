import {I18nState} from '@i18n-pro/vue2'

const initI18nState: I18nState = {
  namespace: 'testNamespace',
  langs: {
    en: () => import('../i18n/en.json').then(res=>res.default),
    cht: () => import('../i18n/cht.json').then(res=>res.default),
    jp: () => import('../i18n/jp.json').then(res=>res.default),
  },
  formatNumber({ locale, payload, t }) {
    let res = payload as string
    switch (locale) {
      case 'en':
        if (typeof payload === 'number') {
          if (payload > 1000000) {
            res = payload / 1000000 + ' Million'
          }
        }
        break
      case 'zh':
      case 'cht':
      case 'JP':
      default:
        if (typeof payload === 'number') {
          if (payload > 10000000) {
            res = ` ${payload / 10000000} ${t('千万')}`
          }
        }
        break
    }

    return res as string
  },
  formatCurrency({ locale, payload }) {
    let res = (payload + '').replace(/(?!\b)(?=(\d{3})+[\b.])(?<!\.\d+)/g, ',')
    switch (locale) {
      case 'en':
        res = '$' + res
        break
      case 'jp':
        res = 'JPY￥' + res
        break
      case 'zh':
      case 'cht':
      default:
        res = 'CNY￥' + res
        break
    }
    return res
  },
  formatDate({ locale, payload, t }) {
    const date = payload as Date
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    let res = ''

    switch (locale) {
      case 'en':
        res = `${day}/${month}/${year}`
        break
      case 'zh':
      case 'cht':
      case 'jp':
      default:
        res = `${year}${t('年')}${month}${t('月')}${day}${t('日')}`
        break
    }

    return res
  },
  formatTime({ locale, payload }) {
    const date = payload as Date
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    let res = ''

    switch (locale) {
      case 'en':
        res = `${day}-${month}-${year} ${hour}:${minute}:${second}`
        break
      case 'zh':
      case 'cht':
      case 'jp':
      default:
        res = `${year}/${month}/${day} ${hour}:${minute}:${second}`
        break
    }

    return res
  },
  formatPlural({ locale, payload, text, keyword }) {
    let res = text
    switch (locale) {
      case 'en':
        switch (keyword) {
          case 'apples':
            if (payload == 0) {
              res = 'no apple'
            } else if (payload == 1) {
              res = 'one apple'
            } else {
              res = `${payload} apples`
            }
            break
        }
        break
      default:
        res = text
        break
    }

    return res
  },
}

export default initI18nState

