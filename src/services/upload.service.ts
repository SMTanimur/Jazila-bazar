import { HttpClient } from "@/utils/api/http";

export interface IUploadedImage {
  img_id: string;
  img_src: string;
}


export const uploadImage = async (formData: FormData) =>{
      return await HttpClient.post<{image:IUploadedImage}>("/upload/image", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

  }

export const uploadImages = async (formData: FormData) =>{
      return await HttpClient.post<{images:IUploadedImage[]}>("/upload/images", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
  }