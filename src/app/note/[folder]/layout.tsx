import { FolderProvider } from "@/components/context/folder-context";
import FileComponent from "@/components/file/component";

const Layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <FolderProvider>
                <div className="flex flex-col px-4 bg-gray-50 w-56">
                    <FileComponent />
                </div>
            </FolderProvider>

            <div className="flex-1">
                {children}
            </div>
        </>
    );
};

export default Layout;