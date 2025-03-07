import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormContext, Controller } from "react-hook-form";

const WysiwygEditor = ({ name }) => {
  const { control } = useFormContext();

  const modules = {
    toolbar: [["bold"], ["link"]],
  };

  const formats = ["bold", "link"];

  return (
    <div className="p-4 max-w-lg mx-auto">
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <ReactQuill
            {...field}
            theme="snow"
            modules={modules}
            formats={formats}
            className="bg-white"
          />
        )}
      />
    </div>
  );
};

export default WysiwygEditor;
