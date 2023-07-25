const baseUrl = {
  API_TOKEN: 'http://84.201.188.117:5021/',
  API_BONUS: 'http://84.201.188.117:5003/',
};

export const api = {
  getToken: `${baseUrl.API_TOKEN}api/v3/clients/accesstoken`,
  getBonus: (token: string) =>
    `${baseUrl.API_BONUS}api/v3/ibonus/generalinfo/${token}`,
};
