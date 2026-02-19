import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "JPEG", "PNG", "GIF", "WEBP", "SVG"];

function DragDrop({selectedFile , setSelectedFile , handleFileChange} : any) {
  
  return (
    <div>

      {/* Drag Drop Upload Area */}
      <FileUploader
        handleChange={handleFileChange}
        name="file"
        types={fileTypes}
      >
        <div
          className="border-2 border-dashed rounded-xl
          p-8 text-center cursor-pointer
          hover:bg-gray-50 transition h-36
          flex justify-center items-center"
        >
          {selectedFile
            ? selectedFile.name
            : "Drag & drop or browse image"}
        </div>
      </FileUploader>

      {/* File Info */}
      {selectedFile && (
        <div className="flex gap-4 items-center mt-2 p-2">
          <p className="text-sm text-gray-600">
            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </p>

          <button
            onClick={() => setSelectedFile(null)}
            className="bg-gray-100 shadow p-2 rounded-xl
            hover:bg-gray-50 cursor-pointer"
          >
            Clear Choose
          </button>
        </div>
      )}

    </div>
  );
}

export default DragDrop;