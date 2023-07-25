import React, { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './components/InfoBox/InfoBox';
import RectangleBox from './components/RectangleBox/RectangleBox';
import Popup from './components/Popup/Popup';
import { useFetchData } from './hooks/use-fetch-data';
import {
  TAccessTokenResponse,
  TBonusResponse,
  TBonusesPayload,
  TTokenPayload,
} from './utils/types';
import { fetchBonuses, fetchToken } from './utils/requests';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

import { useGetUserCoordinates } from './hooks/useGetUserCoordinates';
import PopupSkeleton from './components/Skeletons/Skeleton';

const REACT_ACCESS_KEY = '891cf53c-01fc-4d74-a14c-592668b7a03c';
const REACT_CLIENT_ID = '2c44d8c2-c89a-472e-aab3-9a8a29142315';
const REACT_DEVICE_ID = '7db72635-fd0a-46b9-813b-1627e3aa02ea';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data,
    isLoading: isTokenLoading,
    getData: getToken,
  } = useFetchData<TAccessTokenResponse, TTokenPayload>(fetchToken);

  const {
    data: bonuses,
    isLoading: isBonusLoading,
    getData: getBonuses,
  } = useFetchData<TBonusResponse, TBonusesPayload>(fetchBonuses);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    if (data?.accessToken && !isOpen) {
      getBonuses({
        accessKey: REACT_ACCESS_KEY,
        token: data.accessToken,
      });
    }
  };

  const { userCoordinates } = useGetUserCoordinates();

  useEffect(() => {
    if (!data?.accessToken && userCoordinates) {
      getToken({
        accessKey: REACT_ACCESS_KEY,
        idClient: REACT_CLIENT_ID,
        idDevice: REACT_DEVICE_ID,
        userCoordinates,
      });
    }
  }, [data?.accessToken, getToken, userCoordinates]);

  if (!data && isTokenLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="app">
      <InfoBox togglePopup={togglePopup} />
      <RectangleBox />
      {isOpen &&
        (bonuses || !isBonusLoading ? (
          <Popup bonusData={bonuses?.data} />
        ) : (
          <PopupSkeleton />
        ))}
    </div>
  );
}

export default App;
