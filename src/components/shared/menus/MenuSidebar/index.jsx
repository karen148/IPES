import React from "react";
import { useSelector } from "react-redux";
// import Link from "@material-ui/core/Link";
// import { useRouter } from "next/router";

const MenuSidebar = () => {
  // const router = useRouter();
  const { rol } = useSelector((state) => state.auth);
  const roles = ["SUPER_ADMIN", "ADMIN_LOCATARIO"];
  const admin = ["SUPER_ADMIN"];
  const menuItems = [
    {
      text: "Tablero",
      url: rol === "SUPER_ADMIN" ? "/admin" : "/locatario",
      icon: "lnr lnr-chart-bars",
      rol: roles,
    },
    {
      text: "Plazas de mercado",
      url: "/admin/plaza",
      icon: "lnr lnr-home",
      rol: admin,
    },
    {
      text: "Locatarios",
      url: "/admin/locatarios",
      icon: "lnr lnr-store",
      rol: admin,
    },
    {
      text: "Clientes",
      url: "/admin/clientes",
      icon: "lnr lnr-users",
      rol: admin,
    },
    {
      text: "Pedidos",
      url: rol === "SUPER_ADMIN" ? "/admin/pedidos" : "/locatario/pedidos",
      icon: "lnr lnr-cart",
      rol: roles,
    },
    {
      text: "Categorías",
      url: "/admin/categorias",
      icon: "lnr lnr-tag",
      rol: admin,
    },
    {
      text: "Productos",
      url: rol === "SUPER_ADMIN" ? "/admin/productos" : "/locatario/productos",
      icon: "lnr lnr-leaf",
      rol: roles,
    },
    {
      text: "Promociones",
      url: "/admin/promociones",
      icon: "lnr lnr-gift",
      rol: admin,
    },
    {
      text: "Perfil",
      url: rol === "SUPER_ADMIN" ? "/admin/perfil" : "/locatario/perfil",
      icon: "lnr lnr-user",
      rol: roles,
    },
  ];

  return (
    <ul className="menu">
      {menuItems.map((item, index) => {
        for (let i = 0; i < item.rol.length; i++) {
          const element = item.rol[i];
          if (element === rol) {
            return (
              <li key={index}>
                <a href={item.url}>
                  <i className={item.icon}></i>
                  {item.text}
                </a>
              </li>
            );
          }
        }
      })}
    </ul>
  );
};

export default MenuSidebar;
