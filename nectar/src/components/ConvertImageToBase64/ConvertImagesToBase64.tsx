import { memo, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import "./ConvertImagesToBase64.css";

const convertImageToBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const ConvertImagesToBase64 = memo(() => {
  const [preview, setPreview] = useState<string[]>([]);
  const [base64Files, setBase64Files] = useState<string[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: async (acceptedFiles: File[]) => {
      const newFiles = await Promise.all(
        acceptedFiles.map(convertImageToBase64)
      );

      const allFiles = [...base64Files, ...newFiles];
      setBase64Files(allFiles);
      setPreview(acceptedFiles.map(URL.createObjectURL));
    },
  } as unknown as DropzoneOptions);

  const handleUpload = () => {
    console.log(base64Files);
  };

  return (
    <div className="upload-container">
      <h3>Convert Images to Base64</h3>
      <div {...getRootProps()} className="dropzone">
        <input {...(getInputProps() as any)} />
        {preview.length ? (
          <>
            <div style={{ flexDirection: "row" }} className="preview-images">
              {preview.slice(0, 3).map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt="Preview"
                  className="preview-image"
                />
              ))}
            </div>
            {preview.length > 4 && <p>{`+${preview.length - 4} more`}</p>}
          </>
        ) : (
          <p>Drag & drop an image or click to select</p>
        )}
      </div>

      <button
        onClick={handleUpload}
        disabled={!base64Files.length}
        className="upload-button"
      >
        Convert to Base64
      </button>
    </div>
  );
});
