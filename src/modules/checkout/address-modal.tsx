"use client";

import { useGlobalModalStateStore } from "@/store/modal";
import { Modal } from "@/components/ui/Modal";
import { useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/utils/api/api-endpoints";
import { addressClient } from "@/services/address.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Icons } from "@/components/ui/icons";
import { TUserAddress, UserAddressSchema } from "@/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IAddress } from "@/types";

const AddressCreateModal = () => {
  const { showAddress, addressData, setAddressData } = useGlobalModalStateStore(
    (state) => state
  );
  const queryClient = useQueryClient();

  const {
    mutateAsync: addressMutation,
    isLoading: addressLoading,
  } = useMutation(addressClient.addressCreate);

  const addressForm = useForm<TUserAddress>({
    resolver: zodResolver(UserAddressSchema),
    defaultValues: {
      email: "",
      city: "",
      country: "",
      default: false,
      name: "",
      phone: "",
      postcode: "",
      state: "",
      street: "",
    },
  });

  const handleClose = () => {
    setAddressData(false, null);
    addressForm.reset();
  };

  const attemptToCreateAddress = async (data: TUserAddress) => {
    try {
      await toast.promise(addressMutation(data), {
        loading: "Creating address...",
        success: (response) => {
          queryClient.invalidateQueries([API_ENDPOINTS.ADDRESSES]);
          queryClient.invalidateQueries([API_ENDPOINTS.ME]);
          handleClose();
          return <b>{response.message || "Address created successfully"}</b>;
        },
        error: (error: any) => {
          const errorMessage =
            error?.response?.data?.message || "Failed to create address";
          return <b>{errorMessage}</b>;
        },
      });
    } catch (error) {
      console.error("Create error:", error);
    }
  };

  return (
    <Modal
      size="md"
      title="Add New Address"
      show={showAddress}
      onClose={handleClose}
    >
      <div className="p-4 sm:p-6">
        <Form {...addressForm}>
          <form
            className="grid gap-4 sm:gap-6"
            onSubmit={(...args) =>
              void addressForm.handleSubmit(attemptToCreateAddress)(...args)
            }
          >
            <FormField
              control={addressForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={addressForm.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Bangladesh" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={addressForm.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="House number and street name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={addressForm.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={addressForm.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={addressForm.control}
              name="postcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PostCode</FormLabel>
                  <FormControl>
                    <Input placeholder="PostCode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col items-start gap-6 sm:flex-row">
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    {...addressForm.register("email")}
                  />
                </FormControl>
                <UncontrolledFormMessage
                  message={addressForm.formState.errors?.email?.message}
                />
              </FormItem>
              <FormItem className="w-full">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+88016******"
                    {...addressForm.register("phone")}
                  />
                </FormControl>
                <UncontrolledFormMessage
                  message={addressForm.formState.errors?.phone?.message}
                />
              </FormItem>
            </div>

            <FormField
              control={addressForm.control}
              name="default"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Set as my default address</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <Button disabled={addressLoading} className="w-full" size="sm">
              {addressLoading && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Save Address
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

const AddressEditModal = () => {
  const {
    showEditAddress,
    editAddressData,
    setEditAddressData,
  } = useGlobalModalStateStore((state) => state);
  const queryClient = useQueryClient();

  const {
    mutateAsync: addressUpdateMutation,
    isLoading: addressUpdateLoading,
  } = useMutation(addressClient.addressUpdate);

  const addressForm = useForm<TUserAddress>({
    resolver: zodResolver(UserAddressSchema),
    defaultValues: {
      default: editAddressData?.address?.default,
      name: editAddressData?.address?.name,
      country: editAddressData?.address?.country,
      street: editAddressData?.address?.street,
      city: editAddressData?.address?.city,
      state: editAddressData?.address?.state,
      postcode: editAddressData?.address?.postcode,
      email: editAddressData?.address?.email,
      phone: editAddressData?.address?.phone,
    },
  });

  const handleClose = () => {
    setEditAddressData(false, null);
    addressForm.reset();
  };

  const attemptToUpdateAddress = async (data: TUserAddress) => {
    if (!editAddressData?.address?._id) return;

    try {
      await toast.promise(
        addressUpdateMutation({
          variables: { id: editAddressData.address._id, input: data },
        }),
        {
          loading: "Updating address...",
          success: (response) => {
            queryClient.invalidateQueries([API_ENDPOINTS.ADDRESSES]);
            queryClient.invalidateQueries([API_ENDPOINTS.ME]);
            handleClose();
            return <b>{response.message || "Address updated successfully"}</b>;
          },
          error: (error: any) => {
            const errorMessage =
              error?.response?.data?.message || "Failed to update address";
            return <b>{errorMessage}</b>;
          },
        }
      );
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <Modal
      size="md"
      title="Edit Address"
      show={showEditAddress}
      onClose={handleClose}
    >
      <div className="p-4 sm:p-6">
        {editAddressData?.address ? (
          <Form {...addressForm}>
            <form
              className="grid gap-4 sm:gap-6"
              onSubmit={(...args) =>
                void addressForm.handleSubmit(attemptToUpdateAddress)(...args)
              }
            >
              <FormField
                control={addressForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addressForm.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Bangladesh" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addressForm.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="House number and street name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addressForm.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addressForm.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addressForm.control}
                name="postcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PostCode</FormLabel>
                    <FormControl>
                      <Input placeholder="PostCode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col items-start gap-6 sm:flex-row">
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@gmail.com"
                      {...addressForm.register("email")}
                    />
                  </FormControl>
                  <UncontrolledFormMessage
                    message={addressForm.formState.errors?.email?.message}
                  />
                </FormItem>
                <FormItem className="w-full">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+88016******"
                      {...addressForm.register("phone")}
                    />
                  </FormControl>
                  <UncontrolledFormMessage
                    message={addressForm.formState.errors?.phone?.message}
                  />
                </FormItem>
              </div>

              <FormField
                control={addressForm.control}
                name="default"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Set as my default address</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <Button
                disabled={addressUpdateLoading}
                className="w-full"
                size="sm"
              >
                {addressUpdateLoading && (
                  <Icons.spinner
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Update Address
              </Button>
            </form>
          </Form>
        ) : (
          <div className="text-center py-4 text-gray-500">
            No address data available
          </div>
        )}
      </div>
    </Modal>
  );
};

const AddressDeleteModal = () => {
  const {
    showDeleteAddress,
    deleteAddressData,
    setDeleteAddressData,
  } = useGlobalModalStateStore((state) => state);
  const queryClient = useQueryClient();

  const { mutateAsync: deleteAddress, isLoading } = useMutation(
    addressClient.addressDelete
  );

  const handleClose = () => {
    setDeleteAddressData(false, null);
  };

  const handleDelete = async () => {
    if (!deleteAddressData?.addressId) return;

    try {
      await toast.promise(deleteAddress(deleteAddressData.addressId), {
        loading: "Deleting address...",
        success: (data) => {
          queryClient.invalidateQueries([API_ENDPOINTS.ADDRESSES]);
          queryClient.invalidateQueries([API_ENDPOINTS.ME]);
          handleClose();
          return <b>{data.message || "Address deleted successfully"}</b>;
        },
        error: (error: any) => {
          const errorMessage =
            error?.response?.data?.message || "Failed to delete address";
          return <b>{errorMessage}</b>;
        },
      });
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <Modal
      size="sm"
      title="Delete Address"
      show={showDeleteAddress}
      onClose={handleClose}
    >
      <div className="p-4 sm:p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20 flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Are you sure?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This action cannot be undone. This will permanently delete the
              address.
            </p>
          </div>
          <div className="flex w-full gap-3 mt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export { AddressCreateModal, AddressEditModal, AddressDeleteModal };
