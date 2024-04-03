//For Add Item to Crt
export const addCart = (prodoct) => {
  return{
    type : "ADDITEM",
    payload : prodoct
  }
}


//For Delete Item From Crt
export const delCart = (prodoct) => {
  return{
    type : "DELITEM",
    payload : prodoct
  }
}