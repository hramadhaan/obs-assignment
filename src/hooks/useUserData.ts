import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getUser = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
};

const useUserData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
    staleTime: 1000 * 60 * 60,
  });

  return { data, isLoading, error };
};

export default useUserData;
