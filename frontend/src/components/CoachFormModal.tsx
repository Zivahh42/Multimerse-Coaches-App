import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import RatingStars from "./RatingStars";

// shadcn/ui
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  category: z.string().min(2, "Category is required"),
  rating: z.number().min(1).max(5),
  status: z.enum(["active", "inactive"]),
});

type FormData = z.infer<typeof schema>;

type Props = {
  open: boolean;
  initial?: Partial<FormData>;
  onSubmit: (data: FormData) => void;
  onClose: () => void;
};

export default function CoachFormModal({
  open,
  initial,
  onSubmit,
  onClose,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      category: "",
      rating: 3,
      status: "active",
    },
  });

  // hydrate form on open/edit
  useEffect(() => {
    if (open) {
      reset({
        name: initial?.name ?? "",
        email: initial?.email ?? "",
        category: initial?.category ?? "",
        rating: initial?.rating ?? 3,
        status: (initial?.status as "active" | "inactive") ?? "active",
      });
    }
  }, [open, initial, reset]);

  const rating = watch("rating");
  const status = watch("status");
  const category = watch("category");

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit Coach" : "Add Coach"}</DialogTitle>
          <DialogDescription>
            Fill the coach details and click {initial ? "Save" : "Create"}.
          </DialogDescription>
        </DialogHeader>

        <form
          className="grid gap-4 py-2"
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Jane Doe" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="jane@coach.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Category (Select) */}
          <div className="grid gap-2">
            <Label>Category</Label>
            <Select
              value={category}
              onValueChange={(val) => setValue("category", val, { shouldValidate: true })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fitness">Fitness</SelectItem>
                <SelectItem value="Yoga">Yoga</SelectItem>
                <SelectItem value="Cricket">Cricket</SelectItem>
                <SelectItem value="Football">Football</SelectItem>
                <SelectItem value="Basketball">Basketball</SelectItem>
                <SelectItem value="Tennis">Tennis</SelectItem>
                <SelectItem value="Swimming">Swimming</SelectItem>
                <SelectItem value="Gymnastics">Gymnastics</SelectItem>
                <SelectItem value="Meditation">Meditation</SelectItem>
                <SelectItem value="Life Coach">Life Coach</SelectItem>
                <SelectItem value="Nutrition">Nutrition</SelectItem>
                <SelectItem value="Mental Health">Mental Health</SelectItem>
                <SelectItem value="Stress Management">Stress Management</SelectItem>
                <SelectItem value="Public Speaking">Public Speaking</SelectItem>
                <SelectItem value="Career Development">Career Development</SelectItem>
                <SelectItem value="Language Coach">Language Coach</SelectItem>
                <SelectItem value="Academic Tutor">Academic Tutor</SelectItem>
                <SelectItem value="Personal Finance">Personal Finance</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          {/* Rating + Status */}
          <div className="grid sm:grid-cols-2 gap-4 items-start">
            <div className="grid gap-2">
              <Label>Rating</Label>
              <RatingStars value={rating} onChange={(n) => setValue("rating", n)} />
              {errors.rating && (
                <p className="text-sm text-red-600">{errors.rating.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Status</Label>
              <div className="flex items-center gap-3">
                <Switch
                  checked={status === "active"}
                  onCheckedChange={(checked) =>
                    setValue("status", checked ? "active" : "inactive")
                  }
                  id="status"
                />
                <Label htmlFor="status" className="text-sm text-neutral-600">
                  {status === "active" ? "Active" : "Inactive"}
                </Label>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {initial ? "Save" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
