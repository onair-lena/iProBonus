import React from 'react';
import { render, screen } from '@testing-library/react';
import Popup from './Popup';
import { convertDateStringToCustomFormat } from '../../utils/convertDateStringToCustomFormat';

describe('Popup', () => {
  test('renders the component with bonus data', () => {
    const bonusData = {
      typeBonusName: 'Sample Bonus',
      currentQuantity: 100,
      forBurningQuantity: 50,
      dateBurning: '2023-07-25',
    };

    render(<Popup bonusData={bonusData} />);

    expect(screen.getByText('100 бонусов')).toBeInTheDocument();
    expect(
      screen.getByText(
        `${convertDateStringToCustomFormat(bonusData.dateBurning)} сгорит`
      )
    ).toBeInTheDocument();
    expect(screen.getByText('50 бонусов')).toBeInTheDocument();
  });

  test('renders the component without bonus data', () => {
    render(<Popup />);

    expect(screen.getByText('0 бонусов')).toBeInTheDocument();
    expect(screen.queryByLabelText('Иконка бонусов')).toBeNull();
  });
});
