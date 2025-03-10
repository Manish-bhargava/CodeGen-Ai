"use client"; // Mark this as a Client Component
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Constants from "@/data/Constants";
import AppHeader from "@/app/_components/AppHeader";
import CodeEditor from "../_components.tsx/CodeEditor";
import SelectionDetail from "../_components.tsx/SelectionDetail";
import Skeleton from "../_components.tsx/Skeleton";

export interface RECORD {
  id: number;
  description: string;
  code: string | null;
  imageUrl: string;
  model: string;
  createdBy: string;
  uid: string;
}

function ViewCode() {
  const { uid } = useParams(); // Get the `uid` from the URL
  const [data, setData] = useState<RECORD | null>(null); // Stores the fetched data
  const [loading, setLoading] = useState(true);
  const [codeResp, setCodeResp] = useState(""); // Stores the code for the editor
  const [isReady, setIsReady] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); // Prevent infinite updates

  // ✅ Function to generate code using the AI model
  const GenerateCode = async (record: RECORD) => {
    try {
      const res = await fetch("/api/ai-model/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: record?.description + ":" + Constants.PROMPT,
          model: record.model,
          imageUrl: record?.imageUrl,
        }),
      });

      if (!res.body) throw new Error("Error: Response body is empty.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let responseText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        responseText += decoder.decode(value);
      }

      // ✅ Try to parse JSON safely
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(responseText);
      } catch (jsonError) {
        console.error("Error parsing AI response:", jsonError);
        return;
      }

      console.log("AI Response:", parsedResponse); // Debugging output

      // ✅ Check if `choices` exist
      if (!parsedResponse?.choices || parsedResponse.choices.length === 0) {
        throw new Error("AI did not return valid choices.");
      }

      const generatedCode = parsedResponse.choices[0]?.message?.content || "";

      // ✅ Check if code is empty
      if (!generatedCode.trim()) {
        throw new Error("AI did not return valid code.");
      }

      // ✅ Remove markdown syntax (```tsx, ```jsx, etc.)
      const cleanedCode = generatedCode.replace(/```[a-z]*\n?/g, "").replace(/```/g, "").trim();

      // ✅ Update state with generated code
      setData((prevData) => (prevData ? { ...prevData, code: cleanedCode } : prevData));
      setCodeResp(cleanedCode);
    } catch (error) {
      console.error("Error generating code:", error);
    }
  };

  // ✅ Function to fetch data from API
  const GetRecordInfo = async () => {
    setIsReady(false);
    setCodeResp("");
    setLoading(true);

    try {
      const result = await axios.get(`/api/wireframe-to-code/?uid=${uid}`);
      if (result.data?.error) {
        console.log("No record found");
        return;
      }

      setData(result.data); // Update state with fetched data
      setCodeResp(result.data.code || ""); // Set code for editor

      // ✅ Only generate code if it's null
      if (!result.data.code) {
        await GenerateCode(result.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setIsReady(true);
    }
  };

  // ✅ Fixed: Function to update the database (Prevents infinite API calls)
  useEffect(() => {
    if (data?.uid && codeResp && !isUpdating) {
      setIsUpdating(true); // Prevents multiple API calls
      const UpdateCodeToDb = async () => {
        console.log("Updating DB with:", { uid: data.uid, code: codeResp });

        try {
          const result = await axios.put(
            "/api/wireframe-to-code",
            { uid: data.uid, code: codeResp || "// No code available" },
            { headers: { "Content-Type": "application/json" } }
          );
          console.log("Code updated successfully:", result.data);
        } catch (error: any) {
          console.error("Error updating code in DB:", error.response?.data || error.message);
        } finally {
          setIsUpdating(false); // Allow further updates
        }
      };
      UpdateCodeToDb();
    }
  }, [codeResp, data?.uid]); // Runs only when `codeResp` updates

  // ✅ Fetch record when `uid` changes
  useEffect(() => {
    GetRecordInfo();
  }, [uid]); // Re-run effect when `uid` changes

  return (
    <div>
      <AppHeader hideSideBar={true} />
      <div className="grid grid-cols-1 md:grid-cols-5 p-5 gap-10">
        {/* SelectionDetail should take 1 column */}
        <div className="md:col-span-1">
          {data && <SelectionDetail record={data} isReady={isReady} regenerateCode={GetRecordInfo} />}
        </div>

        {/* CodeEditor should take 4 columns */}
        <div className="md:col-span-4">
          {isReady ? <CodeEditor codeResp={codeResp} setCodeResp={setCodeResp} isReady={isReady} /> : <Skeleton />}
        </div>
      </div>
    </div>
  );
}

export default ViewCode;
