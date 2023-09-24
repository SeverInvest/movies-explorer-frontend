import "./style.scss";
import { useEffect } from "react";

export default function Habr() {
  useEffect(() => {
if (!localStorage.getItem("jwtHabr")) {
  
}

  }, []);
  return (
    <>
      <p>здесь будет информация о кандидатах</p>
    </>
  );
}
