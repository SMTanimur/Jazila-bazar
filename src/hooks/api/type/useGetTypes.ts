"use client"
import { groupClient } from "@/services/group.service";
import { IType, TypeQueryOptions } from "@/types";
import { API_ENDPOINTS } from "@/utils/api/api-endpoints";
import { useQuery } from "@tanstack/react-query";


export function useTypes(options?: Partial<TypeQueryOptions>) {
  const { data, isLoading, error } = useQuery<IType[], Error>(
    [API_ENDPOINTS.TYPES, options],
   groupClient.getAllGroups
  );
  return {
    types: data,
    isLoading,
    error,
  };
}

export function useType(slug: string) {
  const { data, isLoading, error } = useQuery<IType, Error>(
    [API_ENDPOINTS.TYPES, slug],
    () => groupClient.getGroup(slug),
    {
      enabled: Boolean(slug),
    }
  );
  return {
    type: data,
    isLoading,
    error,
  };
}
