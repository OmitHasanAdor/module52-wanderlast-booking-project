'use client';

import { authClient } from "@/lib/auth-client";
import { FieldError, Input, Label, TextField, Select, ListBox, TextArea, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import toast from "react-hot-toast";

const CATEGORIES = ["Beach", "Mountain", "City", "Adventure", "Cultural", "Luxury"];

const AddDestinationPage = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const raw = Object.fromEntries(formData.entries());

        const destination = {
            ...raw,
            price: Number(raw.price),
            duration: Number(raw.duration),
        };

        setIsSubmitting(true);
        try {
            const { data: tokenData } = await authClient.token();

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${tokenData?.token}`,
                },
                body: JSON.stringify(destination),
            });

            if (!res.ok) {
                throw new Error("Failed to add destination");
            }

            toast.success("Destination added successfully!");
            router.push("/destination");
        } catch (err) {
            console.error("Add destination error:", err);
            toast.error("Failed to add destination. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto mt-5 mb-16">
            <h1 className="p-5 font-bold text-2xl text-center text-gray-900">Add Destination</h1>
            <form
                onSubmit={onSubmit}
                className="p-6 md:p-10 space-y-8 bg-white rounded-2xl shadow-md max-w-3xl mx-auto"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Destination Name */}
                    <div className="md:col-span-2">
                        <TextField name="destinationName" isRequired>
                            <Label>Destination Name</Label>
                            <Input placeholder="Bali Paradise" className="rounded-2xl" />
                            <FieldError />
                        </TextField>
                    </div>

                    {/* Country */}
                    <TextField name="country" isRequired>
                        <Label>Country</Label>
                        <Input placeholder="Indonesia" className="rounded-2xl" />
                        <FieldError />
                    </TextField>

                    {/* Category */}
                    <div>
                        <Select name="category" isRequired className="w-full" placeholder="Select category">
                            <Label>Category</Label>
                            <Select.Trigger className="rounded-2xl">
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox>
                                    {CATEGORIES.map((cat) => (
                                        <ListBox.Item key={cat} id={cat} textValue={cat}>
                                            {cat}
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    {/* Price */}
                    <TextField name="price" type="number" isRequired>
                        <Label>Price (USD)</Label>
                        <Input type="number" min={0} placeholder="1299" className="rounded-2xl" />
                        <FieldError />
                    </TextField>

                    {/* Duration */}
                    <TextField
                        name="duration"
                        type="number"
                        isRequired
                        validate={(value) => {
                            if (Number(value) <= 0) {
                                return "Duration must be at least 1 day";
                            }
                            return null;
                        }}
                    >
                        <Label>Duration (days)</Label>
                        <Input type="number" min={1} placeholder="7" className="rounded-2xl" />
                        <FieldError />
                    </TextField>

                    {/* Departure Date */}
                    <div className="md:col-span-2">
                        <TextField name="departureDate" type="date" isRequired>
                            <Label>Departure Date</Label>
                            <Input type="date" className="rounded-2xl" />
                            <FieldError />
                        </TextField>
                    </div>

                    {/* Image URL */}
                    <div className="md:col-span-2">
                        <TextField name="imageUrl" isRequired>
                            <Label>Image URL</Label>
                            <Input
                                type="url"
                                placeholder="https://example.com/bali-paradise.jpg"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <TextField name="description" isRequired>
                            <Label>Description</Label>
                            <TextArea
                                placeholder="Describe the travel experience..."
                                className="rounded-3xl"
                            />
                            <FieldError />
                        </TextField>
                    </div>
                </div>

                <Button
                    type="submit"
                    isDisabled={isSubmitting}
                    className="rounded-md w-full bg-cyan-500 hover:bg-cyan-600 text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                    {isSubmitting ? "Adding Package..." : "Add Travel Package"}
                </Button>
            </form>
        </div>
    );
};

export default AddDestinationPage;