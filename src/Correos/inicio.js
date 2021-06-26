await transporter.sendMail({
    from: '"Inicio de sesión" <dcrubiano01@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Nuevo inicio de sesión de la cuenta IPES", // Subject line
    html: `
    <div
        style="background-color: rgb(233, 229, 229); border-radius: 15px; position: absolute; width: 575px; height: 730px; justify-content: center; margin-left: 25%;">
        <div style="position:relative; width: 100%; margin-top: 25px;">
            <img src="img-01.png" alt="" style="float: right;">
        </div>
        <div style="position:relative; width: 100%; ">
            <img src="img-02.png" alt="" style="float: right; margin-top: -25px !important;">
        </div>
        <div style="position:relative; width: 100%;  ">
            <img src="img-03.png" alt="" style="float: right; margin-top: -85px !important;">
        </div>
        <div style="position:relative; width: 100%;">
            <img src="img-04.png" alt="" style="float: right;">
        </div>
    </div>
    `,
  });