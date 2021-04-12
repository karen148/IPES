import React from 'react';
import { mount } from "enzyme";
import { PrivateRoute } from '../../router/PrivateRoute';
import { MemoryRouter } from 'react-router';

describe('Pruebas en <PrivateRoute />', () => {

    const props = {
        location: {
            pathname: '/'
        }
    }

    test('Debe mostrar el componente si esta autenticado', () =>{
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated={true}
                    component={() => <span>Hola</span>}
                    {...props}
                />
            </MemoryRouter>
        );

        console.log(wrapper.html());
        expect(wrapper.find('span').exists()).toBe(true);
    })
})