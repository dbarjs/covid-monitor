import Vue from 'vue'
import numeral from 'numeral'
import 'numeral/locales/pt-br'
numeral.locale('pt-br')

Vue.filter('number', (value) => (value ? numeral(value).format('0,0') : ''))
