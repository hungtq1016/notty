'use client'
import { redirect } from "next/navigation";
import useFolder from '@/utils/hooks/useFolder'
import { PropsWithChildren } from "react";
import { toast } from 'react-toastify';
import NoteLoading from "@/components/loading/note";

export default function Page({ children,params }: { children:PropsWithChildren,params: { folder: string } }){
    const { data,isLoading,error } = useFolder(params.folder)
    if (isLoading || error) {
        return  <NoteLoading />
    }
    if (data === null) {
        redirect("/note/me")
    }
    return <Example />
}

function Example() {
    const notify = () => {
      toast("Default Notification !");
  
      toast.success("Success Notification !", {
        position: "top-center"
      });
  
      toast.error("Error Notification !", {
        position: "top-left"
      });
  
      toast.warn("Warning Notification !", {
        position: "bottom-left"
      });
  
      toast.info("Info Notification !", {
        position: "bottom-center"
      });
  
      toast("Custom Style Notification with css class!", {
        position: "bottom-right",
        className: 'foo-bar'
      });
    };
  
     return (
        <>
          <button onClick={notify}>Notify</button>;
        </>
      );
  }
  