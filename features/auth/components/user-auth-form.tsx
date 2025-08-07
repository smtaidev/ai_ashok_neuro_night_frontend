"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/services/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

interface ILoginValues {
  email: string;
  password: string;
}

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const [userLogin] = useLoginMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const [loading, startTransition] = useTransition();
  const defaultValues = {
    email: "brown@clarhet.com",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onLoginSubmit: SubmitHandler<ILoginValues> = async (data: any) => {
    // try {
    //   const response = await userLogin({ ...data }).unwrap();
    //   if (response?.accessToken) {
    //     storeUserInfo({ accessToken: response?.accessToken });
    //     router.push(redirect);
    //     toast.success("Login successful");
    //   }
    // } catch (error: any) {
    //   toast.error("Invalid email or password", error.message);
    // }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onLoginSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            variant={"getStarted"}
            disabled={loading}
            className="mt-6 ml-auto w-full"
            type="submit"
          >
            Login
          </Button>
        </form>
      </Form>
    </>
  );
}
