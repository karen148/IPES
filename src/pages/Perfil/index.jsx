import React from "react";
import ContainerDashboard from "./../../components/layaouts/ContainerDashboard";
import FormAccountSettings from "./../../components/shared/forms/FormAccountSettings";
import HeaderDashboard from "./../../components/shared/headers/HeaderDashboard";
// import { connect, useDispatch } from 'react-redux';
// import { toggleDrawerMenu } from '~/store/app/action';

const Perfil = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //     dispatch(toggleDrawerMenu(false));
  // }, []);

  return (
    <ContainerDashboard title="Settings">
      <HeaderDashboard
        title="Configuración"
        description="Configuración de la cuenta de IPES"
      />
      <section className="ps-dashboard ps-items-listing">
        <div className="ps-section__left">
          <section className="ps-card">
            <div className="ps-card__header">
              <h4>Configuración de la cuenta</h4>
            </div>
            <div className="ps-card__content">
              <FormAccountSettings />
            </div>
          </section>
        </div>
        <div className="ps-section__right"></div>
      </section>
    </ContainerDashboard>
  );
};
export default Perfil;
// export default connect((state) => state.app)(SettingsPage);
