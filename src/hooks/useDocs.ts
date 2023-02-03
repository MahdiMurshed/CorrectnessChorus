import axios from '@lib/axios';
import { useQuery } from '@tanstack/react-query';

const fetchDocs = async (url: string) => {
  const response = await axios(url);
  const { data } = response;
  return data.docs;
};

const useDocs = (userId: string) => {
  const query = useQuery({
    queryKey: ['docs', userId],
    queryFn: () => fetchDocs(`/docs?userId=${userId}`),
    enabled: !!userId,
    keepPreviousData: true,
  });

  return { docs: query.data ?? [], loading: query.isLoading };
};
export default useDocs;
