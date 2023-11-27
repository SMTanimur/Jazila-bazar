import { reviewClient } from "@/services/review.service";
import { useGlobalModalStateStore } from "@/store/modal";
import { IReview, PaginatorInfo } from "@/types";
import { ReviewsQueryOptionsType } from "@/types/custom.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useReviews(options?: Partial<ReviewsQueryOptionsType>) 
{
  return useQuery<PaginatorInfo<IReview>, Error>(
    ["questions", options],
    reviewClient.getReviews,
    {
      keepPreviousData: true,
    }
  );
};

export function useReview({ id }: { id: string }) {
  const { data, isLoading, error } = useQuery<IReview, Error>(
    ["reviews", id],
    () => reviewClient.getReview(id),
    {
      enabled: Boolean(id),
    }
  );
  return {
    review: data,
    isLoading,
    error,
  };
}

export function useCreateReview() {
  const globalModal = useGlobalModalStateStore((state) => state);
  const queryClient = useQueryClient();
  const { mutate: createReview, isLoading } = useMutation(
    reviewClient.createReview,
    {
      onSuccess: ({message}) => {
        toast.success(message);
      },
      onError: (error) => {
        const {
          response: { data },
        }: any = error ?? {};

        toast.error(data?.message);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["reviewsiews"]);
        globalModal.setReviewModalState(false,null);
      },
    }
  );
  return {
    createReview,
    isLoading,
  };
}

export function useUpdateReview() {
 const globalModal = useGlobalModalStateStore((state) => state);
  const queryClient = useQueryClient();
  const { mutate: updateReview, isLoading } = useMutation(
    reviewClient.updateReview,
    {
      onSuccess: ({message}) => {
        toast.success(message);
      },
      onError: (error) => {
        const {
          response: { data },
        }: any = error ?? {};

        toast.error(data?.message);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["reviews"]);
        globalModal.setReviewModalState(false,null)
      },
    }
  );
  return {
    updateReview,
    isLoading,
  };
}
