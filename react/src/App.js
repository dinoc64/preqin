import React, { useEffect, useState } from "react";

function App() {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [asset, setAsset] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch('http://127.0.0.1:8000/investor/Cza Weasley fund/')
      .then((response) => response.json())
      .then((json) => setInvestors(json))
      .then(console.log(investors))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>Investors</h1>
        <table border='1'>
          <thead>
            <tr>
                <td colSpan='4'>
                <table border='1'>
                <tbody>  
                  <tr>
                  <td><button onClick={() => setAsset('all')}>All</button><br />£2.4B</td>
                  <td><button onClick={() => setAsset('Hedge Funds')}>Hedge Funds</button><br />£1.1B</td>
                  <td><button onClick={() => setAsset('Private Equity')}>Private Equity</button><br />£1.0B</td>
                  <td><button onClick={() => setAsset('Real Estate')}>Real Estate</button><br />£200M</td>
                  <td><button onClick={() => setAsset('Infrastructure')}>Infrastructure</button><br />£75M</td>
                  <td><button onClick={() => setAsset('Natural Resources')}>Natural Resources</button><br />£25M</td>
                  </tr>
                </tbody>  
                </table>
                </td>
            </tr>
          </thead>
          <thead>
            <tr>
                <th>Id</th>
                <th>Asset Class</th>
                <th>Currency</th>
                <th>Amount</th>
            </tr>
          </thead>
          <tbody>
          {investors.map((investor) => (
              <tr key={investor.invsetor_id}>
                <td>{investor.investor_id}</td>
                <td>{investor.commitment_asset_class}</td>
                <td>{investor.commitment_currency}</td>
                <td>{(investor.commitment_amount/1000000).toFixed(1)}M</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
      )}  
    </div>
  );
}

export default App;
