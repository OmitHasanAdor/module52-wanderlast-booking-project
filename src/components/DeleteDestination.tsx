"use client";

import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import type { Destination } from "./DestinationCard";

interface DeleteDestinationProps {
    destination: Destination;
}

const DeleteDestination = ({ destination }: DeleteDestinationProps) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const { data: tokenData } = await authClient.token();

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${destination._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${tokenData?.token}`,
                },
            });

            if (!res.ok) {
                throw new Error("Failed to delete destination");
            }

            toast.success("Destination deleted successfully!");
            router.push("/destination");
        } catch (err) {
            console.error("Delete destination error:", err);
            toast.error("Failed to delete destination. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog>
            <Button variant="danger" className="rounded-md">
                Delete Destination
            </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-md">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete Destination permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                Are you sure you want to delete &quot;{destination.destinationName}&quot;? This
                                action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary" isDisabled={isDeleting}>
                                Cancel
                            </Button>
                            <Button
                                slot="close"
                                variant="danger"
                                onClick={handleDelete}
                                isDisabled={isDeleting}
                                className="disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default DeleteDestination;