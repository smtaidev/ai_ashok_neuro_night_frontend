// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useLoginMutation } from "@/redux/services/userApi";
// import { setAuthStatus } from "@/redux/slices/appSlice";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useTransition } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";

// import * as z from "zod";

// interface ILoginValues {
//   email: string;
//   password: string;
// }

// const formSchema = z.object({
//   email: z.string().email({ message: "Enter a valid email address" }),
//   password: z
//     .string()
//     .min(6, { message: "Password must be at least 6 characters" }),
// });

// type UserFormValue = z.infer<typeof formSchema>;

// export default function UserAuthForm() {
//   // const [userLogin] = useLoginMutation();
//   const router = useRouter();
//   // const searchParams = useSearchParams();
//   // const redirect = searchParams.get("redirect") || "/";
//   const [loading, startTransition] = useTransition();

//   const dispatch = useDispatch();
//   const [login, { isLoading, error, data }] = useLoginMutation();
//   console.log("Login data from userAuthForm:", data);

//   const defaultValues = {
//     email: "brown@clarhet.com",
//   };
//   const form = useForm<UserFormValue>({
//     resolver: zodResolver(formSchema),
//     defaultValues,
//   });

//   // const onLoginSubmit: SubmitHandler<ILoginValues> = async (data: any) => {
//   //   // data.preventDefault();
//   //   try {
//   //     const response = await login({
//   //       email: data.email,
//   //       password: data.password,
//   //     }).unwrap();
//   //     console.log("Login response:", response);
//   //     if (response) {
//   //       dispatch(setAuthStatus("authenticated"));
//   //       toast.success("Login successful!");
//   //     }
//   //     startTransition(() => {
//   //       toast.success("Login successful!");
//   //       router.push("/dashboard");
//   //     });
//   //   } catch (err) {
//   //     console.error("Login error:", err);
//   //     toast.error("Login failed!");
//   //   }
//   // };

//   const onLoginSubmit: SubmitHandler<ILoginValues> = async (data) => {
//     try {
//       const response = await login({
//         email: data.email,
//         password: data.password,
//       }).unwrap();

//       if (!response.success) {
//         toast.error(response.message || "Login failed!");
//         return;
//       }
//       dispatch(setAuthStatus("authenticated"));
//       startTransition(() => {
//         router.push("/dashboard");
//       });

//     } catch (err: any) {
//       console.error("Login error:", err);
//       toast.error("Login failed!", err.data.message);
//     }
//   };

//   return (
//     <>
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onLoginSubmit)}
//           className="w-full space-y-2"
//         >
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="email"
//                     placeholder="Enter your email..."
//                     disabled={loading}
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="password"
//                     placeholder="Enter your password..."
//                     disabled={loading}
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button
//             variant={"getStarted"}
//             disabled={loading}
//             className="mt-6 ml-auto w-full"
//             type="submit"
//           >
//             Login
//           </Button>
//         </form>
//       </Form>
//     </>
//   );
// }

//! Try - 1

"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { useDispatch } from "react-redux"
import { useEmployeeLoginMutation } from "@/redux/services/userApi"
import toast from "react-hot-toast"
import { setAuthStatus } from "@/redux/slices/appSlice"
import { useRouter } from "next/navigation"


export default function EmployeeAuthForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const dispatch = useDispatch();
  const [employeeLogin, { data }] = useEmployeeLoginMutation();
  console.log("Login data from userAuthForm:", data);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await employeeLogin({
        email: email,
        password: password,
      }).unwrap();

      if (!response.success) {
        toast.error(response.message || "Login failed!");
        return;
      }
      if (response.message) {
        toast.success(response.message);
      }
      dispatch(setAuthStatus("authenticated"));
      startTransition(() => {
        router.push("/dashboard/overview");
      });

    } catch (err: any) {
      console.error("Login error:", err);
      toast.error("Login failed!", err.data.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-lg font-medium text-[#231F20]">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-lg font-medium text-[#231F20]">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-12"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <Button disabled={loading} type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg rounded-lg">
        Login
      </Button>
    </form>
  )
}

//! Try - 2

// "use client"

// import type React from "react"
// import { useState, useTransition, useRef } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Eye, EyeOff } from "lucide-react"
// import { useDispatch } from "react-redux"
// import { useLoginMutation } from "@/redux/services/userApi"
// import toast from "react-hot-toast"
// import { setAuthStatus } from "@/redux/slices/appSlice"
// import { useRouter } from "next/navigation"

// export default function UserAuthForm() {
//   const [showPassword, setShowPassword] = useState(false)
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [loading, startTransition] = useTransition()
//   const router = useRouter()
//   const dispatch = useDispatch()
//   const [login] = useLoginMutation()

//   // ✅ Ref to prevent duplicate toast
//   const toastShownRef = useRef(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       const response = await login({ email, password }).unwrap()

//       if (!response.success) {
//         if (!toastShownRef.current) {
//           toast.error(response.message || "Login failed!")
//           toastShownRef.current = true
//         }
//         return
//       }

//       if (response.message && !toastShownRef.current) {
//         toast.success(response.message)
//         toastShownRef.current = true
//       }

//       dispatch(setAuthStatus("authenticated"))
//       startTransition(() => {
//         router.push("/dashboard/overview")
//       })
//     } catch (err: any) {
//       if (!toastShownRef.current) {
//         toast.error(err?.data?.message || "Login failed!")
//         toastShownRef.current = true
//       }
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="space-y-2">
//         <Label htmlFor="email" className="text-lg font-medium text-[#231F20]">
//           Email
//         </Label>
//         <Input
//           id="email"
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
//           required
//         />
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="password" className="text-lg font-medium text-[#231F20]">
//           Password
//         </Label>
//         <div className="relative">
//           <Input
//             id="password"
//             type={showPassword ? "text" : "password"}
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-12"
//             required
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//           >
//             {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//           </button>
//         </div>
//       </div>

//       <Button
//         disabled={loading}
//         type="submit"
//         className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg rounded-lg"
//       >
//         Login
//       </Button>
//     </form>
//   )
// }
