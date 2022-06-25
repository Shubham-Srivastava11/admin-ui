import UserData from './components/UserData/UserData';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Pagination from './components/Pagination/Pagination';
// import SpecificUSerData from './components/SpecificUserData/SpecificUserData';

function App() {


  let URL = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';


  const [fetchedData, setUserDetails] = useState([]);
  const [mainApiData, setApiData] = useState([]);
  const [error, setError] = useState('');


  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios.get(URL)
      .then((res) => {
        // console.log(res);
        if (res.statusText === 'OK') return res.data;
        throw new Error('something went wrong while requesting posts');
      })
      .then((response) => {
        // console.log(response);
        setUserDetails(response);
        setApiData(response);
      })
      .catch((error) => setError(error.message));

  }

  const deleteHandler = (id) => {
    const val = fetchedData.filter((item) => item.id !== id);

    setApiData(val);
    setUserDetails(val);
  }

  const editedDataHandler = (data) => {
    console.log(data);
    const objIndex = mainApiData.findIndex((obj => obj.id === data[0]));
    mainApiData[objIndex].name = data[1];
    mainApiData[objIndex].email = data[2];
    mainApiData[objIndex].role = data[3];

    setUserDetails(mainApiData);
  }

  const onSelectedDeleteHandler = (idList) => {
    // console.log(idList);
    if (idList.length === 0) {
      window.alert('Please Select atleast 1 row.');
    } else {
      var afterDeleteList = fetchedData;
      for (let id of idList) {

        const val = afterDeleteList.filter((item) =>
          item.id !== id
        );

        afterDeleteList = val;
        // console.log(afterDeleteList)
      }
      setUserDetails(afterDeleteList);

      setApiData(afterDeleteList);
    }
  }

  const filterUser = (event) => {

    if (event.target.value.length === 0) {
      // fetchData();
      setUserDetails(mainApiData);
      // setApiData(mainApiData);
    } else {

      const filter = mainApiData.filter(item => (
        item.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.email.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.role.toLowerCase().includes(event.target.value.toLowerCase())
      ));
      setUserDetails(filter);
    }
  }

  if (error) return <h1>{error}</h1>;

  return (
    <React.Fragment>
      <input
        type='text'
        className='searchBox'
        placeholder="Search by name, email or role"
        onChange={filterUser}
      />

      <UserData
        key={Math.random()}
        items={fetchedData}
        ondeleteHandler={deleteHandler}
        pageLimit={5}
        dataLimit={10}
        selectedDeleteHandler={onSelectedDeleteHandler}
        editedData={editedDataHandler} >
      </UserData>

      {fetchedData.length === 0 && <h2 >No Record Found</h2>}


    </React.Fragment>
  );
}

export default App;
