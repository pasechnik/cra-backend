import * as mzc from './controller'

export const baseUrl = '/v1/mzc'

export const routes = [
  {
    method: 'GET',
    route: '/',
    handlers: [
      mzc.getGeneralSettingsFront(),
    ],
  },
  // http://{{backend}}/v1/mzc/mz_cashier_get_general_settings_front
  {
    method: 'GET',
    route: '/mz_cashier_get_general_settings_front',
    handlers: [
      mzc.getGeneralSettingsFront(),
      mzc.getSpreadResults('mzcs'),
    ],
  },
  // http://{{backend}}/v1/mzc/mz_cashier_get_existing_cards/?&_dc=1536524330134&page=1&start=0&limit=25
  {
    method: 'GET',
    route: '/mz_cashier_get_existing_cards',
    handlers: [
      mzc.getExistingCards(),
      mzc.getSpreadArrayResults('mzcs'),
    ],
  },
  // http://{{backend}}/v1/mzc/mz_cashier_get_countries/?&_dc=1536524330134&page=1&start=0&limit=25
  {
    method: 'GET',
    route: '/mz_cashier_get_countries',
    handlers: [
      mzc.getCountries(),
      mzc.getSpreadResults('mzcs'),
    ],
  },
  // http://{{backend}}/v1/mzc/mz_cashier_get_pago_countries/?&_dc=1536524330134&page=1&start=0&limit=25
  {
    method: 'GET',
    route: '/mz_cashier_get_pago_countries',
    handlers: [
      mzc.getPagoCountries(),
      mzc.getSpreadResults('mzcs'),
    ],
  },
  // POST http://{{backend}}/v1/mzc/mz_cashier_deposit/?&_dc=1536524330134&page=1&start=0&limit=25
  // FormData:
  // mz_cashier_amount_visual-inputEl=Other%20Amount&amount=500&mode=NewCard&cardNum=4242424242424242
  // &cardType=Visa&ExpMonth=10&ExpYear=2018&CVV2%2FPIN=100&FirstName=DoNotDelete&LastName=DoNotDelete
  // &Country=GB&City=NA&Address=&countryPhone=44&Phone=7122154879&MT4AccountNumber=1200654
  {
    method: 'POST',
    route: '/mz_cashier_deposit',
    handlers: [
      mzc.postDeposit(),
      mzc.getSpreadResults('mzcs'),
    ],
  },

]

export default { baseUrl, routes }
