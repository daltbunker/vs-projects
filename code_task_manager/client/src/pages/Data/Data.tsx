import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import "./Data.css";
import axios from "axios";

export default function Data() {
  const [barChartData, setBarChartData] = useState<Array<any>>([]);
  const [pieChartData, setPieChartData] = useState<Array<any>>([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    axios
      .get("/api/data/files", config)
      .then((resp) => {
        setPieChartData(() => {
          return [...resp.data];
        });
      })
      .catch((err) => console.error(err));

    axios
      .get("/api/data/tasks", config)
      .then((resp) => {
        setBarChartData(() => {
          return [...resp.data];
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      className="dresser-row"
      style={{ color: "white", justifyContent: "center" }}
    >
      <BarChart
        data={barChartData}
        display={{
          height: 380,
          width: 460,
          padding: 50,
          title: "Tasks",
        }}
      />
      <PieChart
        data={pieChartData}
        display={{
          height: 380,
          width: 460,
          padding: 50,
          title: "File Changes",
        }}
      />
    </div>
  );
}
