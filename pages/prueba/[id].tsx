import { GetServerSidePropsContext } from "next";
import { useState } from "react";

type Props = {
  prueba: string;
  id: string;
};

export default function PruebaPage({ prueba, id }: Props) {
  const p = JSON.parse(prueba);

  const [data, setData] = useState("");

  const handleClick = async () => {
    const res = await fetch("/api/hello");
    const data = await res.json();
    const { name } = data;
    setData(name);
  };

  return (
    <div>
      El dato es: {p} y el id es {id}
      <div>
        <button onClick={handleClick}>Obtener datos de API routes</button>
        <p>El dato de api route es: {data}</p>
      </div>
    </div>
  );
}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const prueba = "prueba";

  const { query } = context;
  const { id } = query;

  return {
    props: {
      prueba: JSON.stringify(prueba),
      id,
    },
  };
};
