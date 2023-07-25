import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { useFetchData } from './hooks/use-fetch-data';

jest.mock('./hooks/use-fetch-data');

const mockUseFetchData = useFetchData as jest.MockedFunction<
  typeof useFetchData
>;
const mockedTokenResp = {
  result: {
    status: 0,
    message: '',
    messageDev: '',
    codeResult: 0,
    duration: 0,
    idLog: '',
  },
  accessToken: 'mocked-token',
};

jest.mock('./hooks/useGetUserCoordinates', () => ({
  useGetUserCoordinates: () => ({
    userCoordinates: { lat: 1, lng: 2 },
  }),
}));

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading spinner while loading token', async () => {
    mockUseFetchData.mockReturnValue({
      data: undefined,
      isLoading: true,
      getData: jest.fn(),
    });
    render(<App />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('does not renders loading spinner data received', async () => {
    mockUseFetchData.mockReturnValue({
      data: { mockedTokenResp },
      isLoading: false,
      getData: jest.fn(),
    });
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
  });

  test('renders InfoBox component', async () => {
    mockUseFetchData.mockReturnValue({
      data: { mockedTokenResp },
      isLoading: false,
      getData: jest.fn(),
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/логотип/i)).toBeInTheDocument();
    });
  });

  test('renders RectangleBox component', async () => {
    mockUseFetchData.mockReturnValue({
      data: { mockedTokenResp },
      isLoading: false,
      getData: jest.fn(),
    });
    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('rectangle-box')).toBeInTheDocument();
    });
  });

  test('opens the Popup when togglePopup is called', async () => {
    mockUseFetchData.mockReturnValue({
      data: { mockedTokenResp },
      isLoading: false,
      getData: jest.fn(),
    });
    render(<App />);

    expect(
      screen.queryByLabelText(/Иконка перехода из попап/i)
    ).not.toBeInTheDocument();

    const toggleButton = screen.getByLabelText(/Кнопка открыть попап/i);
    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(
        screen.getByLabelText(/Иконка перехода из попап/i)
      ).toBeInTheDocument();
    });
  });
});
