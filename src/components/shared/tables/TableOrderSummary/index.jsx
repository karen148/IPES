import React from "react";

const TableOrderSummary = () => (
  <div className="table-responsive">
    <table className="table ps-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Fechas</th>
          <th>Producto</th>
          <th>Pago</th>
          <th>Proceso</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>#A580</td>
          <td>
            <strong> Aug, 15, 2020</strong>
          </td>
          <td>
            <a href="order-detail.html">
              <strong>Unero Black Military</strong>
            </a>
          </td>
          <td>
            <span className="ps-badge success">Pago</span>
          </td>
          <td>
            <span className="ps-fullfillment success">Entregado</span>
          </td>
          <td>
            <strong>$56.00</strong>
          </td>
          <td>
            <div className="dropdown">
              <a
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="lnr lnr-list"></i>
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item" href="#">
                  Editar
                </a>
                <a className="dropdown-item" href="#">
                  Eliminar
                </a>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>#B260</td>
          <td>
            <strong> Aug, 15, 2020</strong>
          </td>
          <td>
            <a href="order-detail.html">
              <strong>Marsh Speaker</strong>
            </a>
          </td>
          <td>
            <span className="ps-badge gray">No pago</span>
          </td>
          <td>
            <span className="ps-fullfillment success">Entregado</span>
          </td>
          <td>
            <strong>$56.00</strong>
          </td>
          <td>
            <div className="dropdown">
              <a
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="lnr lnr-list"></i>
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item" href="#">
                  Editar
                </a>
                <a className="dropdown-item" href="#">
                  Eliminar
                </a>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>#A583</td>
          <td>
            <strong> Aug, 15, 2020</strong>
          </td>
          <td>
            <a href="order-detail.html">
              <strong>Lined Blend T-Shirt</strong>
            </a>
          </td>
          <td>
            <span className="ps-badge success">Pago</span>
          </td>
          <td>
            <span className="ps-fullfillment warning">En progreso</span>
          </td>
          <td>
            <strong>$516.00</strong>
          </td>
          <td>
            <div className="dropdown">
              <a
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="lnr lnr-list"></i>
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item" href="#">
                  Editar
                </a>
                <a className="dropdown-item" href="#">
                  Eliminar
                </a>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>#A583</td>
          <td>
            <strong> Aug, 15, 2020</strong>
          </td>
          <td>
            <a href="order-detail.html">
              <strong>DJI MAcvic Quadcopter</strong>
            </a>
          </td>
          <td>
            <span className="ps-badge gray">No pago</span>
          </td>
          <td>
            <span className="ps-fullfillment success">Entregado</span>
          </td>
          <td>
            <strong>$112.00</strong>
          </td>
          <td>
            <div className="dropdown">
              <a
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="lnr lnr-list"></i>
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item" href="#">
                  Editar
                </a>
                <a className="dropdown-item" href="#">
                  Eliminar
                </a>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>#A112</td>
          <td>
            <strong> Aug, 15, 2020</strong>
          </td>
          <td>
            <a href="order-detail.html">
              <strong>Black T-Shirt</strong>
            </a>
          </td>
          <td>
            <span className="ps-badge success">Pago</span>
          </td>
          <td>
            <span className="ps-fullfillment danger">Cancelado</span>
          </td>
          <td>
            <strong>$30.00</strong>
          </td>
          <td>
            <div className="dropdown">
              <a
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="lnr lnr-list"></i>
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item" href="#">
                  Editar
                </a>
                <a className="dropdown-item" href="#">
                  Eliminar
                </a>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default TableOrderSummary;
