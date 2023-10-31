module.exports = ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET", "aaaaaaaaaaa"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT", "aaaaaaaaaaa"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT", "aaaaaaaaaaa"),
    },
  },
});
