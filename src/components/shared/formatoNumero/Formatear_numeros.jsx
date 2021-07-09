export default function Formatear(num) {
  if (num) {
    let num_string = num?.toString();
    let len_num = num_string.length;
    var float = "";
    if (num_string.indexOf(".") !== -1) {
      let index = num_string.indexOf(".");
      var entero = num_string.substring(0, index);
      float = num_string.substring(index, len_num);
      float = float.replace(".", ",");
    } else {
      entero = num.toString();
    }
    let resultado = "";
    var j = 0;
    var i = 0;
    for (j, i = entero.length - 1, j = 0; i >= 0; i--, j++)
      resultado =
        entero.charAt(i) + (j > 0 && j % 3 === 0 ? "." : "") + resultado;
    return resultado + float;
  }
}
