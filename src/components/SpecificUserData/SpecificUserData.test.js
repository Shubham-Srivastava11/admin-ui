import { render, screen, fireEvent, cleanup, getByTestId, queryByTestId, queryByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UserEvent from '@testing-library/user-event';
import UserData from '../UserData/UserData';
import App from '../../App';
import SpecificUserData from './SpecificUserData';


afterEach(cleanup)
window.fetch = jest.fn(() => {
    const user = [{ id: '1', name: 'Jack', email: 'jack@email.com', role: 'admin' }];

    return Promise.resolve({
        json: () => Promise.resolve(user),
    });
});

describe('Testing SpecificUserData component', () => {
    test('If data is displayed on screen.', async () => {

        render(
            <SpecificUserData
                id='1'
                name='Jack'
                email='jack@email.com'
                role='admin'></SpecificUserData>
        );
        const nameElement = await screen.findByTestId('nameInput' + '1');
        expect(nameElement.value).toBe('Jack');
        const emailElement = await screen.findByTestId('emailInput');
        expect(emailElement.value).toBe('jack@email.com');
        const roleElement = await screen.findByTestId('roleInput');
        expect(roleElement.value).toBe('admin');
    });

    test('On click delete button.', async () => {

        // const deleteUser = () => {
        //     return true;
        // }

        const { queryByText, queryByTestId, findByTestId } = render(
            <App></App>
        );

        const delBtn = await screen.findByTestId('deleteButton' + '1');

        UserEvent.click(delBtn);
        const nameElement = await screen.queryByTestId('nameInput' + '1');

        expect(nameElement?.value).not.toBe('Aaron Miles');

    });

    // test('Delete all on 1 page.', async () => {

    //     const deleteUser = () => {
    //         return true;
    //     }

    //     const { queryByText, queryByTestId, findByTestId } = render(
    //         <App></App>
    //     );

    //     const delBtn = await screen.findByTestId('deleteButton' + '1');

    //     UserEvent.click(delBtn);
    //     const nameElement = await screen.queryByTestId('nameInput' + '1');

    //     expect(nameElement?.value).not.toBe('Aaron Miles');

    // });

});
