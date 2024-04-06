import { type ReactNode } from "react";


const CreateLayout = ({children}: {children: ReactNode}) => {
    return <div className="mt-10">
        {children}
    </div>
}


export default CreateLayout;