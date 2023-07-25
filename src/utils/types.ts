export type TAccessTokenResponse = {
  result: {
    status: number;
    message: string;
    messageDev: string;
    codeResult: number;
    duration: number;
    idLog: string;
  };
  accessToken: string;
};

export type TBonusResponse = {
  resultOperation: {
    status: number;
    message: string;
    messageDev: string;
    codeResult: number;
    duration: number;
    idLog: string;
  };
  data: {
    typeBonusName: string;
    currentQuantity: number;
    forBurningQuantity: number;
    dateBurning: string;
  };
};

export type TTokenPayload = {
  url: string;
  accessKey: string;
  idClient: string;
  idDevice: string;
  userCoordinates: TCoordinates;
};

export type TBonusesPayload = {
  url: string;
  accessKey: string;
  token: string;
};

export type TCoordinates = {
  latitude: number;
  longitude: number;
};
