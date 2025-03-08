// import React from "react";
// import { RECORD } from "../[uid]/page";
// import Image from "next/image";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { RefreshCcw } from "lucide-react";
// interface SelectionDetailProps {
//   record: RECORD;
// }

// function SelectionDetail({ record ,regenerateCode,isReady}: any) { 
//   console.log("Record Data:", record);

//   return (
//     <div className="p-5 bg-gray-100 w-[40vh] h-full rounded-lg  flex flex-col">
//         <h2 className="font-bold my-2 ">Wireframe</h2>
//       {record?.imageUrl ? (
//         <Image
//           src={record.imageUrl}
//           alt="Wireframe"
//           width={300}
//           height={400}
//           className="rounded-lg object-contain h-[200px] w-full border border-dashed p-2 bg-white"
//         />
//       ) : (
//         <p>No image available</p>
//       )}
//       <h2 className="font-bold my-2  mt-4 mb-2">AI Model</h2>
//       {/* <h2 className="p-1 bg-white border rounded-md">{record?.model}</h2> */}
//       <Input defaultValue={record?.model}/>
//       <h2 className="font-bold my-2  mt-4 mb-2">Description</h2>
//       <textarea defaultValue={record?.description} className="bg-white border mb-3  h-[180px] rounded" />
//              <Button onClick={regenerateCode} disabled={!isReady}><RefreshCcw/>Regenrate Code</Button>
//     </div>
//   );
// }

// export default SelectionDetail;
import React from "react";
import { RECORD } from "../[uid]/page";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

interface SelectionDetailProps {
  record: RECORD;
  regenerateCode: () => void; // Pass function as a prop
  isReady: boolean;
}

function SelectionDetail({ record, regenerateCode, isReady }: SelectionDetailProps) {
  console.log("Record Data:", record);

  return (
    <div className="p-5 bg-gray-100 w-[35vh] h-full rounded-lg flex flex-col">
      <h2 className="font-bold my-2">Wireframe</h2>
      {record?.imageUrl ? (
        <Image
          src={record.imageUrl}
          alt="Wireframe"
          width={300}
          height={400}
          className="rounded-lg object-contain h-[200px] w-full border border-dashed p-2 bg-white"
        />
      ) : (
        <p>No image available</p>
      )}
      
      <h2 className="font-bold my-2 mt-4 mb-2">AI Model</h2>
      <Input defaultValue={record?.model} />

      <h2 className="font-bold my-2 mt-4 mb-2">Description</h2>
      <textarea defaultValue={record?.description} className="bg-white border p-2 mb-3 h-[180px] rounded" />

      {/* ✅ Fix: Ensure the regenerateCode function is called properly */}
      <Button onClick={() => regenerateCode()} disabled={!isReady}>
        <RefreshCcw className="mr-2" />
        Regenerate Code
      </Button>
    </div>
  );
}

export default SelectionDetail;

