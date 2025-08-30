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
import { setAuthStatus } from "@/redux/slices/appSlice";
import { getCookie } from "@/utils/cookie-storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

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
  const router = useRouter();
  const [loading, startTransition] = useTransition();

  const dispatch = useDispatch();
  const [login, { data }] = useLoginMutation();
  // console.log("Login data from userAuthForm:", data);

  const defaultValues = {
    email: "tawhid@vai.com",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // const onLoginSubmit: SubmitHandler<ILoginValues> = async (data) => {
  //   try {
  //     const response = await login({
  //       email: data.email,
  //       password: data.password,
  //     }).unwrap();

  //     if (!response.success) {
  //       toast.error(response.message || "Login failed!");
  //       return;
  //     }
  //     dispatch(setAuthStatus("authenticated"));
  //     toast.success("Login successful!");
  //     startTransition(() => {
  //       router.push("/dashboard");
  //     });

  //   } catch (err: any) {
  //     console.error("Login error:", err);
  //     toast.error("Login failed!", err.data.message);
  //   }
  // };

  const onLoginSubmit: SubmitHandler<ILoginValues> = async (data) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (response.success) {
        toast.success("Login successful!");
        router.push("/dashboard"); // redirect
      } else {
        toast.error(response.message || "Login failed!");
      }

    } catch (err: any) {
      console.error("Login error:", err);
      toast.error("Login failed!", err?.data?.message || "Something went wrong!");
    }
  };


  const token = getCookie("accessToken");
  console.log("Token from cookie:", token);


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
