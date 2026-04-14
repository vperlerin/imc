import React, { useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { useFormContext, Controller } from "react-hook-form";

const WysiwygEditor = ({ name }) => {
  const { control } = useFormContext();

  const modules = {
    toolbar: [["bold"], ["link"]],
  };

  const formats = ["bold", "link"];

  const sanitize = useCallback(
    (value) => DOMPurify.sanitize(value, { ALLOWED_TAGS: ["b", "strong", "a", "br", "p"], ALLOWED_ATTR: ["href", "target", "rel"] }),
    [],
  );

  return (
    <div className="p-4 max-w-lg mx-auto">
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <ReactQuill
            {...field}
            onChange={(content) => field.onChange(sanitize(content))}
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
