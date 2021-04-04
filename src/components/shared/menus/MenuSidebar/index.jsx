import React from 'react';
import Link from '@material-ui/core/Link';
// import { useRouter } from 'next/router';

const MenuSidebar = () => {
    // const router = useRouter();
    const menuItems = [
        {
            text: 'Tablero',
            url: '/tablero',
            icon: 'lnr lnr-chart-bars',
        },
        {
            text: 'Plazas de mercado',
            url: '/mercado',
            icon: 'lnr lnr-home',
        },
        {
            text: 'Locatarios',
            url: '/tablero',
            icon: 'lnr lnr-store',
        },
        {
            text: 'Clientes',
            url: '/tablero',
            icon: 'lnr lnr-users',
        },
        {
            text: 'Pedidos',
            url: '/tablero',
            icon: 'lnr lnr-cart',
        },
        {
            text: 'Categorías',
            url: '/tablero',
            icon: 'lnr lnr-tag',
        },
        {
            text: 'Productos',
            url: '/tablero',
            icon: 'lnr lnr-leaf',
        },
        {
            text: 'Perfil',
            url: '/perfil',
            icon: 'lnr lnr-user',
        },
    ];

    return (
        <ul className="menu">
            {menuItems.map((item, index) => (
                <li
                    key={index}
                    // className={router.pathname === item.url ? 'active' : ''}
                    >
                    {/* <Link href={item.url}> */}
                        <a href={item.url}>
                            <i className={item.icon}></i>
                            {item.text}
                        </a>
                    {/* </Link> */}
                </li>
            ))}
        </ul>
    );
};

export default MenuSidebar;
