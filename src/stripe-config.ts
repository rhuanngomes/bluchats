export const products = {
  bluAnnual: {
    id: 'prod_SDJsXiPDIDDWnf',
    priceId: 'price_1RItF1JcrABcyNlNHhS7bxQ9',
    name: 'plano blu anual (50% de desconto)',
    description: '1 WhatsApp com até 10 usuários',
    price: 1200,
    mode: 'subscription' as const,
  },
  bluMonthly: {
    id: 'prod_SDJqt7Lm4DxH8K',
    priceId: 'price_1RItCqJcrABcyNlNfB4iVqTo',
    name: 'plano blu mensal',
    description: 'plataforma de atendimento omnichannel',
    price: 150,
    mode: 'subscription' as const,
  }
} as const;