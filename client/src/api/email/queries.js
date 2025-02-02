import { axiosPublic } from "../axios.config";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const getEmailsByUsername = async (username) => {
  return axiosPublic.get(`/email/inbox/${username}`);
};

export const getUnreadEmailsByUsername = async (username) => {
  return axiosPublic.get(`/email/inbox/unread/${username}`);
};

export const getStarredEmailsByUsername = async (username) => {
  return axiosPublic.get(`/email/inbox/starred/${username}`);
};

export const getEmailByID = async (id) => {
  return axiosPublic.get(`/email/${id}`);
};

export const useGetEmailsByUsername = (username) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryFn: () => getEmailsByUsername(username),
    queryKey: [`emails-${username}`],
  });

  const refetchAndInvalidate = async () => {
    await query.refetch();
    queryClient.invalidateQueries([`unread-emails-${username}`]);
  };

  return { ...query, refetch: refetchAndInvalidate };
};

export const useGetUnreadEmailsByUsername = (username) => {
  return useQuery({
    queryFn: () => getUnreadEmailsByUsername(username),
    queryKey: [`unread-emails-${username}`],
  });
};

export const useGetStarredEmailsByUsername = (username) => {
  return useQuery({
    queryFn: () => getStarredEmailsByUsername(username),
    queryKey: [`starred-emails-${username}`],
  });
};

export const useGetEmailByID = (id) => {
  return useQuery({
    queryFn: () => getEmailByID(id),
    queryKey: [`email-${id}`],
  });
};
