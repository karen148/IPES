import xlsx from "json-as-xlsx";

const Excel = (columns, content, settings) => {
  xlsx(columns, content, settings);
};

export default Excel;
