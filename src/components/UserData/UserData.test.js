import { render, screen, fireEvent, cleanup, getByTestId, queryByTestId, queryByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

    test('Delete all on 1 page.', async () => {

        const deleteUser = () => {
            return true;
        }

        window.alert = () => { };

        const { queryByText, queryByTestId, findByTestId } = render(
            <App></App>
        );

        const select = await screen.findByTestId('selectAll');
        UserEvent.click(select);

        const del = await screen.findByTestId('deleteAllBtn');
        UserEvent.click(del);

        const nameElement = await screen.queryByTestId('nameInput' + '1');

        expect(nameElement?.value).not.toBe('Aaron Miles');

        const nameElementAfter = await screen.queryByTestId('nameInput' + '11');

        const noRecord = await screen.findByText(/No Record/i);
        expect(noRecord).toBeInTheDocument('No Record Found');

    });

});
