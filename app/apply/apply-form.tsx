"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

const DISCIPLINES = [
  "Web Development",
  "Graphic Design",
  "Content Writing",
  "SEO",
  "Digital Marketing",
  "Video Production",
  "Photography",
  "UI/UX Design",
  "App Development",
  "Social Media",
];

function ApplyForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <Field>
          <FieldLabel>Name*</FieldLabel>
          <Input placeholder="First + Surname" />
        </Field>

        <Field>
          <FieldLabel>Location*</FieldLabel>
          <Input placeholder="E.G FRANCE" className="" />
        </Field>
        <Field>
          <FieldLabel>Website*</FieldLabel>
          <Input placeholder="HTTPS://" className="" />
        </Field>
        <Field>
          <FieldLabel className="items-baseline">
            Disciplines <small className="text-xs">[1 — 3]</small>
          </FieldLabel>
          <div className="grid grid-cols-2 gap-2">
            {DISCIPLINES.map((discipline) => (
              <div
                key={discipline}
                className="flex items-center space-x-2 uppercase"
              >
                <Checkbox id={discipline} />
                <label htmlFor={discipline} className="text-[13px] select-none">
                  {discipline}
                </label>
              </div>
            ))}
          </div>
        </Field>

        <Button
          type="submit"
          className="rounded-full bg-white text-primary hover:bg-white"
        >
          SEND APPLICATION
        </Button>
      </form>
    </Form>
  );
}

export default ApplyForm;
