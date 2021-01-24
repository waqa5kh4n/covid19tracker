import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

function Graph() {
  const [casesReported, setCases] = useState([]);
  const [countryReported, setCountry] = useState([]);
  const [deathReported, setDeath] = useState([]);
  const [recoveredReported, setRecovered] = useState([]);
  //const [populateDate, setDate] = useState([]);

  useEffect(() => {
    let casesRep = [];
    let countryRep = [];
    let deathRep = [];
    let recoveredRep = [];

    axios
      .get("https://disease.sh/v3/covid-19/countries")
      .then((res) => {
        //console.log("cases " + JSON.stringify(res.data[0].cases));
        //console.log("country " + JSON.stringify(res.data[0].country));
        for (const dataObj of res.data) {
          casesRep.push(parseInt(dataObj.cases));
          countryRep.push(dataObj.country);
          deathRep.push(parseInt(dataObj.deaths));
          recoveredRep.push(parseInt(dataObj.recovered))

          //console.log("each cases : "+dataObj.cases);
          //console.log("each country : "+dataObj.country);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //  console.log(casesRep, countryRep);
    setCases(casesRep);
    setCountry(countryRep);
    setDeath(deathRep);
    setRecovered(recoveredRep);

  }, []);

  const series = [
    {
      name: "cases",
      data: casesReported,
    },
    {
      name: "deaths",
      data: deathReported,
    },
    {
      name: "recovered",
      data: recoveredReported,
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
      type: "text",
      categories: countryReported,
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
