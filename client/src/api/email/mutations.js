import { axiosPublic } from "../axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const toggleStarEmail = async (id, username) => {
  const response = await axiosPublic.patch(`/email/star/${id}`, { username });
  return response.data;
};

export const getRandomEmail = async () => {
  const response = await axiosPublic.post(`/email/generate`);
  return response.data;
};

export const updateEmailStatus = async (id, username) => {
  const response = await axiosPublic.patch(`/email/see/${id}`, { username });
  return response.data;
};

export const deleteEmailByID = async (id) => {
  const response = await axiosPublic.delete(`/email/${id}`);
  return response.data;
};

export const useToggleStarEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, username }) => toggleStarEmail(id, username),
    onSuccess: (data, { username }) => {
      toast.success(data?.message);
      queryClient.invalidateQueries([`emails-${username}`]);
    },
    onError: (error) => {
      toast.error("Action Failed. Please Try Again");
    },
  });
};

export const useGetRandomEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => getRandomEmail(),
    onSuccess: (data) => {
      toast.success("New email generated successfuly!");
      queryClient.invalidateQueries([`emails-user`]);
    },
    onError: (error) => {
      toast.error("Failed to generate new email.");
    },
  });
};

export const useUpdateEmailStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, username }) => updateEmailStatus(id, username),
    onSuccess: (data, { username }) => {
      queryClient.invalidateQueries([`unread-emails-${username}`]);
    },
  });
};

export const useDeleteEmailByID = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, username }) => deleteEmailByID(id),
    onSuccess: (data, { username }) => {
      toast.success("Email deleted successfuly!");
      queryClient.invalidateQueries([`emails-${username}`]);
    },
    onError: (error) => {
      toast.error("Failed to delete email.");
    },
  });
};
