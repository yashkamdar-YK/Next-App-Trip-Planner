import { useQuery } from 'react-query';
import axios from 'axios';

const useLocationSearch = (query) => {
  const { data: locations = [], isLoading } = useQuery(
    ['locations', query],
    async () => {
      if (!query || query.length < 2) return [];
      
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      return response.data;
    },
    {
      enabled: query.length >= 2,
      refetchOnWindowFocus: false,
    }
  );

  return { locations, isLoading };
};

export default useLocationSearch;