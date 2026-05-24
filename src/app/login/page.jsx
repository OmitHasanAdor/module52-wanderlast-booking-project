"use client";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";


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
    };

    return (
        <div>
            <h2 className=" text-3xl font-medium text-center mt-8">Login to Your Account</h2>
            <p className=" text-center">Welcome back! Please enter your details.</p>
            <div className="">
                <Form className="flex w-96 flex-col gap-4 border shadow-sm rounded-md mx-auto p-5" onSubmit={onSubmit}>

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
            </div>
        </div>
    );
};

export default LoginPage;