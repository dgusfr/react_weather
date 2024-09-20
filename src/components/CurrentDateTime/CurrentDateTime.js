import React from "react";

function CurrentDateTime() {
  const now = new Date().toLocaleString();
  return <p>{`Atualizado em: ${now}`}</p>;
}

export default CurrentDateTime;
