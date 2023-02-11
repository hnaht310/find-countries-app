import { useState, useEffect } from 'react';
import axios from 'axios';
import CountryList from './components/CountryList';

const App = () => {
  const [initialData, setInitialData] = useState([]);
  const [term, setTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://restcountries.com/v3.1/all');
      const data = await res.json();
      setInitialData(data);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  // find countries with names matching the user input
  const filteredData = initialData.filter((country) =>
    country.name.common.toLocaleLowerCase().includes(term.toLocaleLowerCase())
  );

  // useEffect(() => {
  //   setFilteredData(
  //     initialData.filter((country) =>
  //       country.name.common
  //         .toLocaleLowerCase()
  //         .includes(term.toLocaleLowerCase())
  //     )
  //   );
  // }, [term]);

  // console.log(filteredData);
  // console.log(term);
  console.log(initialData);

  return (
    <div>
      find countries <input value={term} onChange={handleChange} />
      {term ? <CountryList countries={filteredData} /> : null}
    </div>
  );
};
export default App;
