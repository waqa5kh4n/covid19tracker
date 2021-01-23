import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Columns from "react-columns";
import Form from "react-bootstrap/Form";
import NumberFormat from "react-number-format";
import GridLoader from "react-spinners/GridLoader";

function Home() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");
const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .all([
        axios.get("https://disease.sh/v3/covid-19/all"),
        axios.get("https://disease.sh/v3/covid-19/countries"),
      ])
      .then((responseArr) => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();
  const filterCountries = results.filter((item) => {
    return searchCountries !== ""
      ? item.country.includes(searchCountries)
      : item;
  });

  const countries = filterCountries.map((data, i) => {
    return (
      <Card
        key={i}
        bg="light"
        text="dark"
        className="text-center"
        style={{ margin: "10px" }}
      >
        <Card.Img variant="top" src={data.countryInfo.flag}></Card.Img>
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>
            <NumberFormat
              value={data.cases}
              displayType={"text"}
              thousandSeparator={true}
              prefix="Cases "
            />
          </Card.Text>
          <Card.Text>
            <NumberFormat
              value={data.deaths}
              displayType={"text"}
              thousandSeparator={true}
              prefix="Deaths "
            />
          </Card.Text>
          <Card.Text>
            <NumberFormat
              value={data.recovered}
              displayType={"text"}
              thousandSeparator={true}
              prefix="Recovered "
            />
          </Card.Text>
          <Card.Text>
            <NumberFormat
              value={data.todayCases}
              displayType={"text"}
              thousandSeparator={true}
              prefix="Today's cases "
            />
          </Card.Text>
          <Card.Text>
            <NumberFormat
              value={data.todayDeaths}
              displayType={"text"}
              thousandSeparator={true}
              prefix="Today's deaths "
            />
          </Card.Text>
          <Card.Text>
            <NumberFormat
              value={data.active}
              displayType={"text"}
              thousandSeparator={true}
              prefix="Active "
            />
          </Card.Text>
          <Card.Text>
            <NumberFormat
              value={data.critical}
              displayType={"text"}
              thousandSeparator={true}
              prefix="Critical "
            />
          </Card.Text>
        </Card.Body>
      </Card>
    );
  });

  var queries = [
    {
      columns: 2,
      query: "min-width: 500px",
    },
    {
      columns: 3,
      query: "min-width: 1000px",
    },
  ];

  return (
    <div className="App">
      <GridLoader size={15} margin={20} color={"#123abc"} loading={loading} />
      <CardDeck>
        <Card
          bg="secondary"
          text={"white"}
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>
              <NumberFormat
                value={latest.cases}
                displayType={"text"}
                thousandSeparator={true}
              />
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="danger"
          text={"white"}
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>
              <NumberFormat
                value={latest.deaths}
                displayType={"text"}
                thousandSeparator={true}
              />
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="success"
          text={"white"}
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>
              <NumberFormat
                value={latest.recovered}
                displayType={"text"}
                thousandSeparator={true}
              />
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      <Form>
        <Form.Group controlId="formGroupSearch">
          <Form.Control
            type="text"
            placeholder="Search a Country"
            onChange={(e) => setSearchCountries(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Columns queries={queries}>{countries}</Columns>
    </div>
  );
}

export default Home;
