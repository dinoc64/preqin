import React, { useEffect, useState } from "react";
import moment from 'moment';

function App() {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [asset, setAsset] = useState("");
  const [investorName, setInvestorName] = useState("");

  var mode = 'all';
  var fetch_single_text = '';
  if(investorName){
    mode = 'single';
    if(asset){
      fetch_single_text = 'http://127.0.0.1:8000/investor/'+investorName+'/'+asset+'/';
    }
    else{
      fetch_single_text = 'http://127.0.0.1:8000/investor/'+investorName+'/';
    }
  }
  console.log(fetch_single_text)
  var mode_obj = [];
  mode_obj['all'] = {'fetch':'http://127.0.0.1:8000/investors', 'title':'Investors'};
  mode_obj['single'] = {'fetch':fetch_single_text, 'title':'Investor'};

  useEffect(() => {
    setLoading(true);
    fetch(mode_obj[mode]['fetch'])
      .then((response) => response.json())
      .then((json) => setInvestors(json))
      .then(console.log(fetch_single_text))
      .finally(() => {
        setLoading(false);
      });
  }, [investorName]);

  return (
    <div className="App">
      <h1>{mode_obj[mode]['title']}</h1>
      {(() => {
        if (loading) {
          return (
            <div>Loading...</div>
          )
        } else if (mode == 'all') {
          return (
            <table border='1'>
            <thead>
              <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Date Added</th>
                  <th>Address</th>
                  <th>Total Commitment</th>
              </tr>
            </thead>
            <tbody>
            {investors.map((investor) => (
                <tr key={investor.investor_date_added}>
                  <td>{investor.id}</td>
                  <td><button onClick={() => setInvestorName(investor.investor_name)}>{investor.investor_name}</button></td>
                  <td>{investor.investor_type}</td>
                  <td>{moment(investor.investor_date_added).format('MMMM do, yyyy')}</td>
                  <td>{investor.investor_country}</td>
                  <td>{(investor.total_commitment/1000000000).toFixed(1)}B</td>
                </tr>
              ))}
            </tbody>
          </table>
          )
        } else {
          return (
            <>
          <div><button onClick={() => window.location.reload()}>Back</button></div>  
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
          )
        }
      })()}
    </div>
  );
}

export default App;
