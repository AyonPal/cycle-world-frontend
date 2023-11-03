import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import API from '../api';

function DataDetails() {
  const [details, setDetails] = useState(null);
    const [error, setError] = useState('');
    const { name } = useParams();

  useEffect(() => {
    const fetchDataDetails = async () => {
      try {
        const response = await API.get(`/spots/${name}`);
        if(response.data.error){
          setError(response.data.error)
        }else {

        }
        setDetails(response.data.data.spot);
      } catch (error) {
        console.error('Error fetching data details:', error);
      }
    };

    fetchDataDetails();
  }, [name]);

  return (
    <Card>
      <CardContent>
        {details ? (
          <>
            <Typography variant="h5" component="div">
             Location Name:  {details.name}
            </Typography>
            <Typography variant="body2">Location: [{details.lat}, {details.lon}]</Typography>
            <Typography variant="body2">Cycle: {details.cycle_access ? "Accessible via Cycle" : "Inccessible via Cycle"}</Typography>
          </>
        ) : 
          error ? (<Typography variant="body2">{error}</Typography>) :(<Typography variant="body2">Loading...</Typography>)
        }
      </CardContent>
    </Card>
  );
}

export default DataDetails;
