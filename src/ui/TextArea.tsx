import { TextareaHTMLAttributes, useEffect, useRef } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea: React.FC<TextAreaProps> = ({ value, ...rest }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textAreaRef.current!.style.height = "auto";
    textAreaRef.current!.style.height =
      textAreaRef.current!.scrollHeight + "px";
  }, [value]);

  return (
    <textarea
      ref={textAreaRef}
      {...rest}
      value={value}
      className="w-full resize-none overflow-hidden py-2 text-xl outline-none"
      rows={1}
    ></textarea>
  );
};

export default TextArea;
