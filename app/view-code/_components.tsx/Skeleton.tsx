import React from "react";
import { Loader } from "lucide-react";

function Skeleton() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-gray-50 rounded-lg p-6">
      <Loader className="animate-spin size-8 text-blue-600 mb-4" />
      <p className="text-lg font-medium text-gray-700">
        Converting Your Design To Code...
      </p>
    </div>
  );
}

export default Skeleton;