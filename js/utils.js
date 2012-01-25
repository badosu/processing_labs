/**
 * @author amadeus
 */
function mascara(obj, funcao){
  var e = mascara.caller.arguments[0];
  obj.value = funcao(obj.value+String.fromCharCode(e.charCode));
  e.returnValue = false;
  e.stopPropagation();
}

function CEP(v) {
  v = v.replace(/\D/g, "");
  v = v.replace(/^(\d{5})(\d)/, "$1-$2")
  v = v.substring(0,9);
  return v;
}