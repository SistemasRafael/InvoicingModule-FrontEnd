import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type DragAndDropPropertyType = {
    onSummit : (result: string | ArrayBuffer | null) => void
}

function DragAndDrop({ onSummit }: DragAndDropPropertyType) {

    const onDrop = useCallback((acceptedFiles: any) => {
        acceptedFiles.forEach((file: any) => {
          const reader = new FileReader();
          reader.onabort = () => console.log('file reading was aborted');
          reader.onerror = () => console.log('file reading has failed');
          reader.onload = () => {
            onSummit(reader.result);
          };
          reader.readAsText(file);
        });
      }, [onSummit]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()} className="mx-auto flex items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
            <div>
                <div className="text-xl font-medium text-center text-black dark:text-white">
                <input {...getInputProps()} />
                {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
                </div>
            </div>
        </div>
    );
}

export default DragAndDrop