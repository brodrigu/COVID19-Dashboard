const conf = {
    apiBaseUrl: process.env.BESTOKE_API_ROOT || 'https://api.bestoke.co',
    loginUrl: process.env.BESTOKE_LOGIN_ROOT || 'https://login.bestoke.co',
    stripePublicKey: process.env.STRIPE_PUBLIC_KEY || 'pk_test_KYBfBAXB4UaphlcY6DVeXkKu',
    tokboxApiKey: process.env.TOK_API_KEY || '46398402',
};

export default conf;
