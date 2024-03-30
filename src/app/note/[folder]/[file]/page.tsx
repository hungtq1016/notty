'use client'
import { FileProvider } from "@/components/context/file-context";
import NoteComponent from "@/components/note/component";

const Page = () => {

  return (
    <FileProvider>
      <div className="overflow-auto h-screen px-5">
        <NoteComponent />
      </div>
    </FileProvider>
  );
}

export default Page;