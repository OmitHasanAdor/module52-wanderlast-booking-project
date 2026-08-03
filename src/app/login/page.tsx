"use client";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { redirect } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";


const LoginPage = () => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());
        const { data, error } = await authClient.signIn.email({
            email: user.email, // required
            password: user.password, // required
            rememberMe: true,
            callbackURL: "/",
        });
        if (error) {
            alert(error.message);
        } else {
            alert("Login successful! Redirecting to your dashboard...");
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
            <h2 className=" text-3xl font-medium text-center mt-8">Login to Your Account</h2>
            <p className=" text-center">Welcome back! Please enter your details.</p>
            <div className="max-w-105 my-8 border shadow-sm rounded-md mx-auto p-5 space-y-3">
                <Form className="flex w-96 flex-col gap-4 mx-auto p-5" onSubmit={onSubmit}>

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
                            Login to Account
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

export default LoginPage;