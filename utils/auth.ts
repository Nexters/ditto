export const createOauthId = (vender: string, vender_id: number) => `${vender}:${vender_id}`;

export const createCredentials = (user_id: number, oauth_id: string) => ({
  email: `+${user_id}@email.com`,
  password: oauth_id,
});
