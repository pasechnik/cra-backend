const deposit = {
  fail0: {
    status: 'Failed',
    err: 'MZ: Credit Card Bin-Country In Countries Black List',
    bank_err: '',
    success: false,
  },
  fail1: {
    status: 'Failed',
    err: 'MZ: Clearer Test Account Setting Problem.',
    bank_err: '',
    success: false,
  },
  fail2: {
    err: 'Force New',
    force_new_cc: true,
    success: false,
  },
  fail3: {
    status: 'Failed',
    err: 'MZ: Amount of 50USD does not meet the Min and Max deposit rules.',
    bank_err: '',
    success: false,
  },
  success: {
    status: 'success',
    success: true,
    err: '',
    bank_err: '',
  },
  pending0: {
    status: 'Pending',
    target: 'iframe',
    addDepositData: '',
    the3d_form: '',
    the3d_url: 'https://www.ipko.pl/3dsecure/visa',
    the3d_params: {
      PaReq: 'eJxVUdtuwjAM/RXE++okLZQiE4mt02BSYQP2sMco9UYleiFtV+Dr15TbFimSj4994hzjZmuIwjXp2pDEiMpSfVMviSf9Qj0'
        + 'ETIx87gdeX+LbdEV7iT9kyiTPJHeYIxCusO00equySqLS+8f5QnoD1x8yhAvElMw8lKw9ngh8hDPGTKUk12JjVEyOzlOELoM6r7P'
        + 'KHKVwXYQrwNrs5LaqijFA0zROKap7n+UQ7nO81TYqW61DEssonDZ/7iAK597i9OwuN+8TBFuBsapICsZHLOB+j3tjEYzFEKHLo0r'
        + 'tEFIMmMPst84QC/vK9MZZ6m8KW18NZfooR15L3RDSocgzsk0ItxjhPvTTzFqpq7Npq/y4Yrx2Z7G/+0qa4cvn7mQ+XpeRNbgrsoq'
        + 'JNYxx3klagGBl4LK71pxuvW30b+2/tWepVw==',
      TermUrl: 'https://www.s2trade.com/mzc.php?action=mz_cashier_3d_secure_handler&c=se&tid=1200654_35b3d355_18',
      MD: '1200654_35b3d355_18',
      sendMethod: 'post',
    },
    success: true,
  },
  pending1b: {
    status: 'Pending',
    target: 'iframe',
    addDepositData: JSON.stringify({
      source: 'https://cdn.checkout.com/js/frames.js',
      callback: 'checkoutCallback',
      Checkout: {
        publicKey: 'pk_test_d0e065e3-f51a-46c7-9ccb-7a355142f4b8',
        transactionId: '1200661_001fce65_18',
      },
    }),
    the3d_form: '',
    the3d_url: '',
    the3d_params: '',
    success: true,
  },
  pending2: {
    status: 'Pending',
    addDepositData: null,
    the3d_form: null,
    the3d_url: 'https://api.certus.finance/FE/rest/tx/payment/3DAuth/GXyeN6xpy7f-'
      + 'iADNE3VfmnlJUki3vVQtASIm7i6rOg1pIoJxqFBunRR7mBVkILyd?a=1',
    the3d_params: {},
    success: true,
    target: 'self',
  },
}

export default deposit
