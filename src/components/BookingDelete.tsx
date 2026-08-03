"use client";

import { authClient } from "@/lib/auth-client";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface BookingDeleteProps {
    bookingId: string;
    destinationName?: string;
}

const BookingDelete = ({ bookingId, destinationName }: BookingDeleteProps) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const { data: tokenData } = await authClient.token();

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${bookingId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${tokenData?.token}`,
                },
            });

            if (!res.ok) {
                throw new Error("Failed to delete booking");
            }

            toast.success("Booking deleted successfully!");
            router.push("/mybooking");
        } catch (err) {
            console.error("Booking delete error:", err);
            toast.error("Failed to delete booking. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog>
            <Button variant="danger" className="rounded-md flex items-center gap-1">
                <TrashBin />
                Delete
            </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-md">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete booking permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete your booking
                                {destinationName ? (
                                    <>
                                        {" "}
                                        for <strong>{destinationName}</strong>
                                    </>
                                ) : null}
                                . This action cannot be undone.
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
                                {isDeleting ? "Deleting..." : "Delete Booking"}
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default BookingDelete;