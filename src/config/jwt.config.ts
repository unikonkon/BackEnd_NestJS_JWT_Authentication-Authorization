export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  refreshSecret:
    process.env.JWT_REFRESH_SECRET ||
    'your-refresh-secret-key-change-in-production',
  accessTokenExpiry: '15m',
  refreshTokenExpiry: '7d',
};

