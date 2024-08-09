"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export const Actions = ({
  disabled,
  courseId,
  isPublished,
}: ActionsProps) => {
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  const onClick = async () => {
    try {
      setIsloading(true);

      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/unpublish`
        );
        toast.success("Course unpublished");
      } else {
        await axios.patch(
          `/api/courses/${courseId}/publish`
        );
        toast.success("Course published");
        confetti.onOpen();
      }
      router.refresh();
    } catch (error) {
      toast.error("Something Went Wrong");
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsloading(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course Deleted");
      router.refresh();
      router.push(`/teacher/courses`);
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setIsloading(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
