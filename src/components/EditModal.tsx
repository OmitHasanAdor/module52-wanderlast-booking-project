"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { FieldError, Select, ListBox, TextArea } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import toast from "react-hot-toast";
import type { Destination } from "./DestinationCard";

interface EditModalProps {
    destination: Destination;
}

const CATEGORIES = ["Beach", "Mountain", "City", "Adventure", "Cultural", "Luxury"];

const EditModal = ({ destination }: EditModalProps) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { country, category, price, duration, departureDate, description, destinationName, imageUrl, _id } =
        destination;

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const raw = Object.fromEntries(formData.entries());

        const updatedDestination = {
            ...raw,
            price: Number(raw.price),
            duration: Number(raw.duration),
        };

        setIsSubmitting(true);
        try {
            const { data: tokenData } = await authClient.token();

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${_id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${tokenData?.token}`,
                },
                body: JSON.stringify(updatedDestination),
            });

            if (!res.ok) {
                throw new Error("Failed to update destination");
            }

            toast.success("Destination updated successfully!");
            router.push("/destination");
        } catch (err) {
            console.error("Edit destination error:", err);
            toast.error("Failed to update destination. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal>
            <Button variant="primary" className="rounded-md">
                Edit
            </Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-xl">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>Edit Destination</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Update the details below and save your changes.
                            </p>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={onSubmit} className="p-3 space-y-8 bg-white rounded-2xl max-w-3xl mx-auto">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Destination Name */}
                                        <div className="md:col-span-2">
                                            <TextField name="destinationName" isRequired defaultValue={destinationName}>
                                                <Label>Destination Name</Label>
                                                <Input placeholder="Bali Paradise" className="rounded-2xl" />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Country */}
                                        <TextField name="country" isRequired defaultValue={country}>
                                            <Label>Country</Label>
                                            <Input placeholder="Indonesia" className="rounded-2xl" />
                                            <FieldError />
                                        </TextField>

                                        {/* Category */}
                                        <div>
                                            <Select
                                                name="category"
                                                isRequired
                                                className="w-full"
                                                placeholder="Select category"
                                                defaultSelectedKey={category}
                                            >
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
                                        <TextField name="price" type="number" isRequired defaultValue={String(price)}>
                                            <Label>Price (USD)</Label>
                                            <Input type="number" min={0} placeholder="1299" className="rounded-2xl" />
                                            <FieldError />
                                        </TextField>

                                        {/* Duration */}
                                        <TextField
                                            name="duration"
                                            type="number"
                                            isRequired
                                            defaultValue={String(duration)}
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
                                            <TextField
                                                name="departureDate"
                                                type="date"
                                                isRequired
                                                defaultValue={departureDate}
                                            >
                                                <Label>Departure Date</Label>
                                                <Input type="date" className="rounded-2xl" />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Image URL */}
                                        <div className="md:col-span-2">
                                            <TextField name="imageUrl" isRequired defaultValue={imageUrl}>
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
                                            <TextField name="description" isRequired defaultValue={description}>
                                                <Label>Description</Label>
                                                <TextArea
                                                    placeholder="Describe the travel experience..."
                                                    className="rounded-3xl"
                                                />
                                                <FieldError />
                                            </TextField>
                                        </div>
                                    </div>

                                    <Modal.Footer>
                                        <Button slot="close" variant="secondary" isDisabled={isSubmitting}>
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            isDisabled={isSubmitting}
                                            className="disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? "Saving..." : "Save Edit"}
                                        </Button>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default EditModal;