"use client";

import {Button, Input, Label, Modal, Surface, TextField} from "@heroui/react";
import { FieldError ,Select, ListBox, TextArea} from "@heroui/react";
import { redirect } from "next/navigation";



const EditModal = ({ destination }) => {
        const {  country, category, price, duration, departureDate, description,destinationName,imageUrl ,_id} = destination


      const onSubmit =async(e)=>{
        e.preventDefault()
        const formData= new FormData(e.currentTarget)
        const destination = Object.fromEntries(formData.entries())
        console.log(destination)
        const res = await fetch(`http://localhost:5000/destination/${_id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify(destination)
        })
        const data = await res.json()
        redirect("/destination")
  
        console.log(data)
    }

    return (
        <Modal>
   <Button variant="primary">Edit</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
            
              <Modal.Heading>Edit Destination</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Fill out the form below and we will get back to you as soon as possible.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                 <form onSubmit={onSubmit}
                            className="p-3 space-y-8 bg-white rounded-2xl shadow-md max-w-3xl mx-auto"
                          >
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
                
                              {/* Category - Updated Select Component */}
                              <div>
                                <Select
                                  name="category"
                                  isRequired
                                  className="w-full"
                                  placeholder="Select category"
                                  defaultValue={category}
                                >
                                  <Label>Category</Label>
                                  <Select.Trigger className="rounded-2xl">
                                    <Select.Value />
                                    <Select.Indicator />
                                  </Select.Trigger>
                                  <Select.Popover>
                                    <ListBox defaultValue={category}>
                                      <ListBox.Item id="Beach" textValue="Beach">
                                        Beach
                                        <ListBox.ItemIndicator />
                                      </ListBox.Item>
                                      <ListBox.Item id="Mountain" textValue="Mountain">
                                        Mountain
                                        <ListBox.ItemIndicator />
                                      </ListBox.Item>
                                      <ListBox.Item id="City" textValue="City">
                                        City
                                        <ListBox.ItemIndicator />
                                      </ListBox.Item>
                                      <ListBox.Item id="Adventure" textValue="Adventure">
                                        Adventure
                                        <ListBox.ItemIndicator />
                                      </ListBox.Item>
                                      <ListBox.Item id="Cultural" textValue="Cultural">
                                        Cultural
                                        <ListBox.ItemIndicator />
                                      </ListBox.Item>
                                      <ListBox.Item id="Luxury" textValue="Luxury">
                                        Luxury
                                        <ListBox.ItemIndicator />
                                      </ListBox.Item>
                                    </ListBox>
                                  </Select.Popover>
                                </Select>
                              </div>
                
                              {/* Price */}
                              <TextField name="price" type="number" isRequired defaultValue={price}>
                                <Label>Price (USD)</Label>
                                <Input
                                  type="number"
                                  placeholder="1299"
                                  className="rounded-2xl"
                                />
                                <FieldError />
                              </TextField>
                
                              {/* Duration */}
                              <TextField name="duration" isRequired defaultValue={duration}>
                                <Label>Duration</Label>
                                <Input
                                  placeholder="7 Days / 6 Nights"
                                  className="rounded-2xl"
                                />
                                <FieldError />
                              </TextField>
                
                              {/* Departure Date */}
                              <div className="md:col-span-2">
                                <TextField name="departureDate" type="date" isRequired defaultValue={departureDate}>
                                  <Label>Departure Date</Label>
                                  <Input type="date" className="rounded-2xl" />
                                  <FieldError />
                                </TextField>
                              </div>
                
                              {/* Image URL - Removed preview */}
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
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button type="submit">Save Edit</Button>
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