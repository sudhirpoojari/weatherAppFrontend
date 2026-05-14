import React from 'react'

export default function locationService() {

    import axios from "axios";

export const fetchLocationName = async (lat, lon) => {

  const response = await axios.get(

    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`

  );

  return response.data;
};

  return (
    <div>
      
    </div>
  )
}
