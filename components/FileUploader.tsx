"use client";

import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
// import {convertFileToUrl} from '../lib/utils'

interface FileUploaderProps {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
}

function FileUploader({ files, onChange }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          alt="uploaded file "
          width={1000}
          height={1000}
          className=" max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <Image
            width={40}
            height={40}
            alt="upload"
            src={"/assets/icons/upload.svg"}
          />
          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-green-400">Click to Upload</span> or drag
              and drop.
            </p>
            <p className="">SVG, PNG, GIF and JPEG|JPG (MAX 800 x 400)</p>
          </div>
        </>
      )}
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}

export default FileUploader;
