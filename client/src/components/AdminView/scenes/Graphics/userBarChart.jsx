import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";
import { useEffect, useState } from "react";

const UserBarChart = () => {
  const [users, setUsers] = useState({
    keys: [],
    values: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios("/users/getLastUsers");
        const keys = Object.keys(data);
        const values = Object.values(data);
        setUsers({
          keys: keys,
          values: values,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  if (!users.keys.length || !users.values.length) return <h1>loading</h1>;
  return (
    <>
      <section>
        <BarChart
          xAxis={[
            {
              id: "Sales",
              data: users.keys,
              scaleType: "band",
              label: "Users created last year",
            },
          ]}
          series={[
            {
              data: users.values,
              color: "#228d07",
            },
          ]}
          sx={{ width: "100%" }}
          height={300}
        />
      </section>
    </>
  );
};

export { UserBarChart };
