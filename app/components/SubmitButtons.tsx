"use client";

import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom"



export const CreationSubmit = () => {

    const {pending} = useFormStatus();

    return <>
        {
            pending 
            ? <Button type="submit" size="lg"> <Loader2 className="animate-spin mr-2 h-4 w-4" /> Please wait </Button> 
            : <Button type="submit" size="lg">Next</Button>
        }
    </>
}

export const AddToFavouriteButton = () => {
    const {pending} = useFormStatus();

    return <>
        { pending 
        ? (
            <Button variant="outline" size="icon" className="bg-primary-foreground">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            </Button>
        )
        : (
            <Button variant="outline" size="icon" className="bg-primary-foreground" type="submit">
                <Heart className="w-4 h-4" />
            </Button>
        )
    }
    </>
}
export const DeleteFromFavourite = async () => {
    const {pending} = useFormStatus();

    return <>
        { pending 
        ? (
            <Button variant="outline" size="icon" className="bg-primary-foreground">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            </Button>
        )
        : (
            <Button variant="outline" size="icon" className="bg-primary-foreground" type="submit">
                <Heart className="w-4 h-4 text-primary" fill="#E21C49" />
            </Button>
        )
    }
    </>
}