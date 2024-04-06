"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
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