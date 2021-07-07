import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import xlsx from "xlsx";

const ArchivoCSV = ({ hojas, setHojas, titulo }) => {
  const handleImg1 = (event) => {
    var reader = new FileReader();
    let hojas = [];
    reader.readAsArrayBuffer(event.target.files[0]);
    reader.onloadend = (e) => {
      var data = new Uint8Array(e.target.result);
      var work = xlsx.read(data, { type: "array" });
      work.SheetNames.forEach(function (sheetName) {
        var row = xlsx.utils.sheet_to_row_object_array(work.Sheets[sheetName]);
        hojas.push({
          data: row,
          plaza: sheetName,
        });
      });
    };
    setHojas(hojas);
    reader.onerror = function () {
      console.log(reader.error);
    };
  };

  console.log(hojas);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {titulo}
      </Typography>
      <br></br>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <input
            className="form-control mb-1"
            type="file"
            placeholder=""
            style={{ paddingTop: "10px" }}
            onChange={handleImg1}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

ArchivoCSV.propTypes = {
  hojas: PropTypes.array,
  setHojas: PropTypes.func,
  titulo: PropTypes.string,
};

export default ArchivoCSV;
