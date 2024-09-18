import React from "react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

interface ButtonProps {
  isLoading: boolean;
  className: string;
  children: React.ReactNode;
}

function RLLP_SubmitBtn({ isLoading, className, children }: ButtonProps) {
  return (
    <Button type="submit" disabled={isLoading} className={className || 'shad-primary-btn w-full bg-green-700'}>
      {isLoading ? (
        <>
          {" "}
          <Loader className="animate-spin" /> Submitting{" "}
        </>
      ) : (
        children
      )}
    </Button>
  );
}

export default RLLP_SubmitBtn;
