"use client";
import * as z from "zod";
import axios from "axios";
import { FileUpload } from "@/components/file-upload";

import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { Course } from "@prisma/client";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const formSchema = z.object({
    imageUrl: z.string().min(1, { message: "Image is required" }),
  });

  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing((current) => !current);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course Updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Image
        {!isEditing && initialData.imageUrl && (
          <>
            <Button onClick={toggleEdit} variant="ghost">
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </Button>
          </>
        )}
        {isEditing && (
          <>
            <Button onClick={toggleEdit} variant="ghost">
              Cancel
            </Button>
          </>
        )}
        {!isEditing && !initialData.imageUrl && (
          <Button onClick={toggleEdit} variant="ghost">
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a image
            </>
          </Button>
        )}
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500"></ImageIcon>
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};
