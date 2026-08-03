"use client";
import { authClient } from "@/lib/auth-client";
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaGoogle } from "react-icons/fa";


const SignUpPage = () => {

      const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
   const user = Object.fromEntries(formData.entries());
    console.log("Form Data:", user);
const { data, error } = await authClient.signUp.email({
    name: user.name, // required
    email: user.email, // required
    password: user.password, 
    image:user.photo,
    callbackURL: "/",
});
if (error) {
  alert(error.message);
} else {
    alert("Signup successful! Please check your email to verify your account.");
    redirect("/");
}

  };
  const handleGoogleSignIn= async ()=>{
   await authClient.signIn.social({
    provider: "google",
  });
  }

    return (
        <div>
        <h1 className="text-3xl font-medium text-center mt-8">Create Account</h1>
        <p className=" text-center">Start your adventure with Wanderlust</p>
        <div className=" max-w-105 my-8 border shadow-sm rounded-md mx-auto p-5 space-y-3">
              <Form className="flex w-96 flex-col gap-4  mx-auto" onSubmit={onSubmit}>
      {/* name */}
       <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label>Full Name</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>
          {/* email */}
      
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Email Address</Label>
        <Input placeholder="Enter your email" />
        <FieldError />
      </TextField>
      {/* photo URL */}
<TextField
            isRequired
            name="photo"
            type="url"
        
          >
            <Label>Photo URL</Label>
            <Input placeholder="Enter your photo URL" />
            <FieldError />
          </TextField>

      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}
      >
        <Label>Password</Label>
        <Input placeholder="Create a password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>
      <div className="flex gap-2">
        <Button type="submit" className=" w-full rounded-md bg-cyan-500 hover:bg-cyan-600 text-white">
          <Check />
          Create Account
        </Button>
       
      </div>
    </Form>
<div className="flex items-center gap-4 mt-3 w-full">
    <hr className="flex-1 border-t border-gray-300" />
    <span className="text-center text-gray-500  whitespace-nowrap">Or sign up with</span>
    <hr className="flex-1 border-t border-gray-300" />
</div>
<Button variant="outline" className={'w-full flex items-center rounded-md gap-2'} onClick={handleGoogleSignIn}>
  <FaGoogle />Sign In with Google
</Button>
<p className=" font-semibold text-center">Already have an account? <Link href="/login" className="text-cyan-500 hover:underline">Log in</Link></p>
        </div>
        </div>
    );
};

export default SignUpPage;