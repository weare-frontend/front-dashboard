import Vue from 'vue'
export function toCurrencyString(number){
    number = number ? parseFloat(number) : 0;
    return number.toLocaleString('th-TH', { style: 'currency', currency: 'THB' });
}

const filters = { toCurrencyString  } 

export default Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})