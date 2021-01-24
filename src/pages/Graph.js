import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

function Graph() {
  const [casesReported, setCases] = useState([]);
  const [deathReported, setDeath] = useState([]);
  const [recoveredReported, setRecovered] = useState([]);
  const [populateDate, setDate] = useState([]);

  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/historical/USA?lastdays=5")
      .then((res) => {
        console.log("cases " + JSON.stringify(res.data.timeline.cases));
        setCases(res.data.timeline.cases);

        console.log("deaths " + JSON.stringify(res.data.timeline.deaths));
        setDeath(res.data.timeline.deaths);

        console.log("recovered " + JSON.stringify(res.data.timeline.recovered));
        setRecovered(res.data.timeline.recovered);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log("after cases : " + JSON.stringify(casesReported));
  console.log("after deaths : " + JSON.stringify(deathReported));
  console.log("after recovered : " + JSON.stringify(recoveredReported));

  const series = [
    {
      name: "cases",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
    {
      name: "deaths",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
    {
      name: "recovered",
      data: [111, 32, 45, 32, 34, 52, 41],
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "1/22/20",
        "2/1/20",
        "2/15/20",
        "3/1/20",
        "3/15/20",
        "4/1/20",
        "5/15/20",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return (
    <div style={{ background: "white", textAlign: "center" }}>
      <h2>Graph</h2>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
}

export default Graph;
