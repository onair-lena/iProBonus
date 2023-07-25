import { api } from './api';
import { TAccessTokenResponse, TBonusResponse, TCoordinates } from './types';

export const fetchToken = async ({
  accessKey,
  idClient,
  idDevice,
  userCoordinates,
}: {
  accessKey: string;
  idClient: string;
  idDevice: string;
  userCoordinates: TCoordinates;
}): Promise<TAccessTokenResponse> => {
  return await fetch(api.getToken, {
    method: 'POST',
    headers: {
      AccessKey: accessKey,
      'Content-Type': 'application/json-patch+json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      idClient,
      accessToken: '',
      paramName: 'device',
      paramValue: idDevice,
      latitude: userCoordinates.latitude,
      longitude: userCoordinates.latitude,
      sourceQuery: 0,
    }),
  }).then(async (res) => {
    const data = await res.json();
    if (data.result.status !== 0) {
      throw Error(data.result.message);
    } else {
      return data;
    }
  });
};

export const fetchBonuses = async ({
  accessKey,
  token,
}: {
  accessKey: string;
  token: string;
}): Promise<TBonusResponse> => {
  return await fetch(api.getBonus(token), {
    method: 'GET',
    headers: {
      AccessKey: accessKey,
      accept: 'application/json',
    },
  }).then(async (res) => {
    const data = await res.json();
    if (data.resultOperation.status !== 0) {
      throw Error(data.result.message);
    } else {
      return data;
    }
  });
};
