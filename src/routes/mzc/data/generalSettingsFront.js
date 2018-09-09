const GeneralSettingsFront = {
  lang: {
    mz_cashier_cc_deposit_form: 'Credit Card',
    mz_cashier_amount_title: 'Amount',
    mz_cashier_other_amount: 'Other Amount',
    mz_cashier_card_info_title: 'Card Information',
    mz_cashier_card_num: 'Credit Card Number',
    mz_cashier_card_type: 'Card Type',
    mz_cashier_exp_month: 'Expiration  Date',
    mz_cashier_month: 'Month',
    mz_cashier_year: 'Year',
    mz_cashier_cc_holder_title: 'Credit Card Holder Info',
    mz_cashier_country_combo: 'Country',
    mz_cashier_first_name: 'First Name',
    mz_cashier_last_name: 'Last Name',
    mz_cashier_address: 'Address',
    mz_cashier_city: 'City',
    mz_cashier_email: 'Email',
    mz_cashier_postcode: 'Postal Code',
    mz_cashier_phone: 'Phone',
    mz_cashier_submit: 'Deposit',
    mz_cashier_deposit_failed: 'Something went wrong',
    mz_cashier_deposit_failed2: 'Deposit Failed',
    mz_cashier_existing_cards: 'Existing Cards',
    mz_cashier_select_existing_cards: 'Select Existing Card',
    mz_cashier_select_mode: 'Select Mode',
    mz_cashier_new_card: 'New Card',
    mz_cashier_loading: 'Loading',
    mz_cashier_force_new_cc: 'Dear Customer,As an additional security level, your transaction will be processed ' +
      'using 3D secure measure. Please complete as described in the following page',
    mz_cashier_apm_tab_title: 'E-Wallet',
    mz_cashier_lpm_tab_title: 'Local Payment Method',
    mz_cashier_apm_choose_title: 'Payment Method (Choose one)',
    mz_cashier_customer_info: 'Customer Info',
    mz_cashier_apm_account: 'APM Account',
    mz_cashier_validation_cc: 'Credit Card Number is Required',
    mz_cashier_validation_cc2: 'Invalid CC Type or Number',
    mz_cashier_validation_cvv: 'CVV is Required',
    mz_cashier_validation_expiration: 'Expiration date has Passed',
    mz_cashier_validation_country: 'Country is Required',
    mz_cashier_validation_country2: 'Service unavailable in your area',
    mz_cashier_validation_name: 'Name is Required',
    mz_cashier_validation_name2: 'At least 3 letters',
    mz_cashier_validation_address: 'Address is Required',
    mz_cashier_validation_address2: 'At least 5 characters',
    mz_cashier_validation_city: 'City is Required',
    mz_cashier_validation_city2: 'At least 3 characters',
    mz_cashier_validation_post: 'Postal Code is Required',
    mz_cashier_validation_post2: 'At least 2 characters',
    mz_cashier_validation_phone: 'Phone is Required',
    mz_cashier_validation_phone2: 'At least 8 digits',
    mz_cashier_not_valid_credit_card: 'This is not a valid Credit Card.  Please check your ' +
      'CARD TYPE and NUMBER and try again.',
    mz_cashier_not_valid_credit_card_type: 'Card type not supported',
    mz_cashier_ssl_tooltip: 'This is a secure 256-bit SSL Encrypted payment. You are safe',
    mz_cashier_cvv_tooltip: 'The last 3 digits displayed on the back of your card',
    mz_cashier_cvv_not_valid: 'At least 3 digits',
    mz_cashier_max_amount_tooltip: 'This is the maximum amount for a single deposit',
    mz_cashier_min_amount_tooltip: 'This is the minimum amount for a single deposit',
    mz_cashier_footer_disclaimer: 'Some credit cards require 3D verification.<br>In such case, ' +
      'contact your bank for receving the verification code',
    mz_cashier_ok: 'OK',
    mz_cashier_not_valid_exp_date: 'Expiration date has Passed',
    mz_cashier_choose_account: 'Account Number',
    mz_cashier_wire_tab_title: 'Wire Transfer',
    mz_cashier_wire_account_details: 'Account Details',
    mz_cashier_wire_details_description: 'Please deposit to the following bank account details.<br>Once ' +
      'funds are received, it will be credited to your trading account.',
    mz_cashier_netteler_email: 'Account ID or E-mail Address',
    mz_cashier_netteler_id: 'Secure ID or Authentication Code',
    mz_cashier_popup_accountType_title: 'Complete your choice',
    mz_cashier_popup_accountType_body: 'Deposit {amount}{currency} or more and one of our representatives will ' +
      'contact you to grand you your benefits',
    mz_cashier_popup_3d_verification: 'Please note that all deposits above 1,000 USD will go through 3D Secure ' +
      'verification, which is an additional security layer for online credit and debit card transactions designed ' +
      'to protect cardholders and prevent fraudulent transactions. You will be asked to input either a one-time ' +
      'password being sent to your mobile phone or email, or a fixed password that had been provided to you in ' +
      'the past by your issuing bank',
    mz_cashier_popup_blocked_ip: 'Deposit is not allowed from your country',
    mz_cashier_choose_bank: 'Select Bank',
    mz_cashier_pid: 'Personal ID',
    mz_cashier_input_cc: 'Input credit card data',
    mz_cachier_arm_vload_error_format: 'Incorrect Format',
    mz_cachier_arm_vload_pin: 'PIN',
    mz_cachier_arm_vload_buy_voucher: 'Buy Voucher',
    mz_cachier_currency_title: 'Currency',
    mz_cachier_amountError_text: 'The amount must be a multiple of 10, minimum amount is',
    mz_cachier_cancel_title: 'Cancel',
    mz_cachier_arm_vload_text: 'Make a hassle-free payment Learn more about VLoad or buy a [EUR / USD] ' +
      'voucher at vload.expert.',
    mz_cashier_lang: 'EN',
  },
  ltr: 1,
  currency: 'USD',
  defaul_d: 1000,
  min_d: '250',
  max_d: '20000',
  btn1_amount: '250',
  btn2_amount: 500,
  btn3_amount: 750,
  currency_align: 'left',
  apm: [],
  bankTransfer: [
    {
      name: 'PayTrust88',
      apmValue: 'PayTrust88',
      target: 'self',
    },
  ],
  wireTransfer: [],
  country_phone_prefix: {
    AF: '93',
    AX: '358',
    AL: '355',
    DZ: '213',
    AS: '1684',
    AD: '376',
    AO: '244',
    AI: '1264',
    AQ: '672',
    AG: '1268',
    AR: '54',
    AM: '374',
    AW: '297',
    AU: '61',
    AT: '43',
    AZ: '994',
    BS: '1242',
    BH: '973',
    BD: '880',
    BB: '1246',
    BY: '375',
    BE: '32',
    BZ: '501',
    BJ: '229',
    BM: '1441',
    BT: '975',
    BO: '591',
    BQ: '599',
    BA: '387',
    BW: '267',
    BV: 'NONE',
    BR: '55',
    IO: '246',
    BN: '673',
    BG: '359',
    BF: '226',
    BI: '257',
    KH: '855',
    CM: '237',
    CA: '1',
    CV: '238',
    KY: '1345',
    CF: '236',
    TD: '235',
    CL: '56',
    CN: '86',
    CX: '61',
    CC: '61',
    CO: '57',
    KM: '269',
    CG: '242',
    CK: '682',
    CR: '506',
    CI: '225',
    HR: '385',
    CU: '53',
    CW: '599',
    CY: '357',
    CZ: '420',
    CD: '243',
    DK: '45',
    DJ: '253',
    DM: '1767',
    DO: '1809',
    EC: '593',
    EG: '20',
    SV: '503',
    GQ: '240',
    ER: '291',
    EE: '372',
    ET: '251',
    FK: '500',
    FO: '298',
    FJ: '679',
    FI: '358',
    FR: '33',
    GF: '594',
    PF: '689',
    TF: null,
    GA: '241',
    GM: '220',
    GE: '995',
    DE: '49',
    GH: '233',
    GI: '350',
    GR: '30',
    GL: '299',
    GD: '1473',
    GP: '590',
    GU: '1671',
    GT: '502',
    GG: '44',
    GN: '224',
    GW: '245',
    GY: '592',
    HT: '509',
    HM: 'NONE',
    HN: '504',
    HK: '852',
    HU: '36',
    IS: '354',
    IN: '91',
    ID: '62',
    IR: '98',
    IQ: '964',
    IE: '353',
    IM: '44',
    IL: '972',
    IT: '39',
    JM: '1876',
    JP: '81',
    JE: '44',
    JO: '962',
    KZ: '7',
    KE: '254',
    KI: '686',
    XK: '381',
    KW: '965',
    KG: '996',
    LA: '856',
    LV: '371',
    LB: '961',
    LS: '266',
    LR: '231',
    LY: '218',
    LI: '423',
    LT: '370',
    LU: '352',
    MO: '853',
    MK: '389',
    MG: '261',
    MW: '265',
    MY: '60',
    MV: '960',
    ML: '223',
    MT: '356',
    MH: '692',
    MQ: '596',
    MR: '222',
    MU: '230',
    YT: '262',
    MX: '52',
    FM: '691',
    MD: '373',
    MC: '377',
    MN: '976',
    ME: '382',
    MS: '1664',
    MA: '212',
    MZ: '258',
    MM: '95',
    NA: '264',
    NR: '674',
    NP: '977',
    NL: '31',
    NC: '687',
    NZ: '64',
    NI: '505',
    NE: '227',
    NG: '234',
    NU: '683',
    NF: '672',
    KP: '850',
    MP: '1670',
    NO: '47',
    OM: '968',
    PK: '92',
    PW: '680',
    PS: '970',
    PA: '507',
    PG: '675',
    PY: '595',
    PE: '51',
    PH: '63',
    PN: 'NONE',
    PL: '48',
    PT: '351',
    PR: '1939',
    QA: '974',
    RE: '262',
    RO: '40',
    RU: '7',
    RW: '250',
    BL: '590',
    SH: '290',
    KN: '1869',
    LC: '1758',
    MF: '590',
    PM: '508',
    VC: '1784',
    WS: '685',
    SM: '378',
    ST: '239',
    SA: '966',
    SN: '221',
    RS: '381',
    SC: '248',
    SL: '232',
    SG: '65',
    SX: '1721',
    SK: '421',
    SI: '386',
    SB: '677',
    SO: '252',
    ZA: '27',
    GS: '500',
    KR: '82',
    SS: '211',
    ES: '34',
    LK: '94',
    SD: '249',
    SR: '597',
    SJ: '47',
    SZ: '268',
    SE: '46',
    CH: '41',
    SY: '963',
    TW: '886',
    TJ: '992',
    TZ: '255',
    TH: '66',
    TL: '670',
    TG: '228',
    TK: '690',
    TO: '676',
    TT: '1868',
    TN: '216',
    TR: '90',
    TM: '993',
    TC: '1649',
    TV: '688',
    UG: '256',
    UA: '380',
    AE: '971',
    GB: '44',
    US: '1',
    UM: 'NONE',
    UY: '598',
    UZ: '998',
    VU: '678',
    VA: '39',
    VE: '58',
    VN: '84',
    VG: '1284',
    VI: '1340',
    WF: '681',
    EH: '212',
    YE: '967',
    ZM: '260',
    ZW: '263',
  },
  crm_type: 'alfaAPI2',
  country_by_ip: 'UA',
  EntroPay: {
    url: 'https://secure2.entropay.com/processes/upaffiliatelanding/unprot/affiliatewelcome.do?referrerID = s2trade',
    lang: 'en',
  },
  show_bitcoin_mobile: 'on',
  accountInfo: {
    FIRSTNAME: 'test',
    LASTNAME: 'test',
    PHONE: '5970999899909',
    STREET: '',
    HOUSENUMBER: '',
    POSTCODE: '',
    CITY: '',
    accounts: [
      {
        account: 1673212,
        currency: 'USD',
        accountBalance: 0,
      },
    ],
    isEmailValid: true,
    isIpAllowed: true,
    email: 'rtxb1@zippiex.com',
  },
}

export default GeneralSettingsFront
