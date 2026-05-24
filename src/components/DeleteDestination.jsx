"use client";
import {AlertDialog, Button} from "@heroui/react";
import { redirect } from "next/navigation";

const DeleteDestination = ({destination}) => {
    const handleDelete = async () => {
        const res = await fetch(`http://localhost:5000/destination/${destination._id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json()
        redirect("/destination")
   
    }
    return (
       <AlertDialog>
      <Button variant="danger">Delete Destination</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Destination permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                Are you sure you want to delete this &quot;{destination.country}&quot; destination? This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
    );
};

export default DeleteDestination;