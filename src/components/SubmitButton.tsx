"use client";

import { Loader } from "lucide-react";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      <Button className="w-full font-semibold">
        <span className={pending ? "text-transparent" : ""}>Submit</span>
        {pending && (
          <span className="absolute flex items-center justify-center w-full h-full text-gray-400">
            <Loader className="animate-spin" />
          </span>
        )}
      </Button>
    </>
  );
};

export default SubmitButton;
