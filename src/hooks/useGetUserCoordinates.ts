import { useState, useEffect } from 'react';
import { TCoordinates } from '../utils/types';

export const useGetUserCoordinates = () => {
  const [userCoordinates, setUserCoordinates] = useState<TCoordinates | null>(
    null
  );

  const success = (pos: { coords: TCoordinates }) => {
    const crd: TCoordinates = pos.coords;
    setUserCoordinates({
      latitude: crd.latitude || 0,
      longitude: crd.longitude || 0,
    });
  };
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(success);
  }, []);
  return { userCoordinates };
};
