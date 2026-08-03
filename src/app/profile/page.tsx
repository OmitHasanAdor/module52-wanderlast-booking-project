"use client";

import { authClient } from "@/lib/auth-client";
import { Button, FieldError, Input, Label, TextField, Form } from "@heroui/react";
import Image from "next/image";
import { useState, FormEvent } from "react";
import toast from "react-hot-toast";
import { FiEdit2, FiLogOut } from "react-icons/fi";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/3675/3675805.png";

const ProfilePage = () => {
    const { data, isPending } = authClient.useSession();
    const user = data?.user;

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const image = formData.get("image") as string;

        setIsSaving(true);
        try {
            const { error } = await authClient.updateUser({
                name,
                image: image || undefined,
            });

            if (error) {
                toast.error(error.message ?? "Failed to update profile.");
            } else {
                toast.success("Profile updated successfully!");
                setIsEditing(false);
            }
        } catch (err) {
            console.error("Profile update error:", err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isPending) {
        return (
            <div className="max-w-2xl mx-auto mt-10 p-6 animate-pulse">
                <div className="h-24 w-24 rounded-full bg-gray-200 mx-auto" />
                <div className="h-6 w-40 bg-gray-200 rounded mx-auto mt-4" />
                <div className="h-4 w-56 bg-gray-200 rounded mx-auto mt-2" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="max-w-2xl mx-auto mt-10 p-6 text-center text-gray-500">
                <p>Please log in to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 mb-16 px-5">
            <div className="bg-white rounded-2xl shadow-md p-8">
                <div className="flex flex-col items-center text-center">
                    <Image
                        src={user.image || DEFAULT_AVATAR}
                        alt={user.name ?? "User avatar"}
                        width={96}
                        height={96}
                        className="rounded-full h-24 w-24 object-cover border border-gray-200"
                    />
                    <h1 className="text-2xl font-bold text-gray-900 mt-4">{user.name}</h1>
                    <p className="text-gray-500">{user.email}</p>
                </div>

                <div className="border-t mt-6 pt-6">
                    {!isEditing ? (
                        <div className="flex justify-center">
                            <Button
                                variant="outline"
                                onClick={() => setIsEditing(true)}
                                className="rounded-md flex items-center gap-2"
                            >
                                <FiEdit2 />
                                Edit Profile
                            </Button>
                        </div>
                    ) : (
                        <Form onSubmit={handleUpdate} className="flex flex-col gap-4 max-w-sm mx-auto">
                            <TextField name="name" defaultValue={user.name ?? ""} isRequired>
                                <Label>Full Name</Label>
                                <Input placeholder="Enter your name" />
                                <FieldError />
                            </TextField>

                            <TextField name="image" defaultValue={user.image ?? ""} type="url">
                                <Label>Photo URL</Label>
                                <Input placeholder="Enter your photo URL" />
                                <FieldError />
                            </TextField>

                            <div className="flex gap-3 mt-2">
                                <Button
                                    type="submit"
                                    isDisabled={isSaving}
                                    className="flex-1 rounded-md bg-cyan-500 hover:bg-cyan-600 text-white disabled:opacity-60 transition-colors"
                                >
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsEditing(false)}
                                    className="flex-1 rounded-md"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </Form>
                    )}
                </div>

                <div className="border-t mt-6 pt-6 flex justify-center">
                    <button
                        onClick={() => authClient.signOut()}
                        className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium transition-colors cursor-pointer"
                    >
                        <FiLogOut />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;