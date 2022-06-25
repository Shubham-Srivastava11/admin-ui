import { render, screen, fireEvent, cleanup, getByTestId, queryByTestId, queryByText } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
// import UserData from '../UserData/UserData';
import App from '../../App';
// import SpecificUserData from './SpecificUserData';


afterEach(cleanup)
window.fetch = jest.fn(() => {
    const user = [{ id: '1', name: 'Jack', email: 'jack@email.com', role: 'admin' }];

    return Promise.resolve({
        json: () => Promise.resolve(user),
    });
});

describe('Testing SpecificUserData component', () => {

    test('Check pagination functionality.', async () => {

        const { queryByText, queryByTestId, findByTestId } = render(
            <App></App>
        );

        const next = await screen.findByTestId('nextClick');
        UserEvent.click(next);

        const nameElement = await screen.findByTestId('nameInput' + '11');

        expect(nameElement?.value).toBe('Keshav Muddaiah');

    });

});
