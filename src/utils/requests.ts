import { TAccessTokenResponse, TBonusResponse, TCoordinates } from './types';

export const fetchToken = async ({
  url,
  accessKey,
  idClient,
  idDevice,
  userCoordinates,
}: {
  url: string;
  accessKey: string;
  idClient: string;
  idDevice: string;
  userCoordinates: TCoordinates;
}): Promise<TAccessTokenResponse> => {
  return await fetch(`${url}api/v3/clients/accesstoken`, {
    method: 'POST',
    headers: {
      AccessKey: accessKey,
      'Content-Type': 'application/json-patch+json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      idClient: idClient,
      accessToken: '',
      paramName: 'device',
      paramValue: idDevice,
      latitude: userCoordinates.latitude,
      longitude: userCoordinates.latitude,
      sourceQuery: 0,
    }),
  }).then((res) => res.json());
};

export const fetchBonuses = async ({
  url,
  accessKey,
  token,
}: {
  url: string;
  accessKey: string;
  token: string;
}): Promise<TBonusResponse> => {
  console.log(accessKey, token);
  return await fetch(`${url}api/v3/ibonus/generalinfo/${token}`, {
    method: 'GET',
    headers: {
      AccessKey: accessKey,
      accept: 'application/json',
    },
  }).then((res) => res.json());
};
