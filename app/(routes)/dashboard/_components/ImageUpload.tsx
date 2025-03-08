"use client";
import { useState, useEffect } from "react";
import { CloudUpload, WandSparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import Constants from "@/data/Constants";
// @ts-ignore
import uuid4 from "uuid4";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuthContext } from "@/app/provider";

// Cloudinary Upload Function
const uploadToCloudinary = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "wireframe"); // Replace with your upload preset
  formData.append("cloud_name", "duw3mtrbh"); // Replace with your cloud name

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/duw3mtrbh/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Cloudinary API Error:", errorData);
      throw new Error(`Upload failed: ${errorData.message || "Unknown error"}`);
    }

    const data = await response.json();
    return data.secure_url; // Return the uploaded image URL
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};

function ImageUpload() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [model, setModel] = useState<string>(""); // Corrected type
  const [description, setDescription] = useState<string>(""); // Corrected type
  const [loading,setLoading]=useState(false);
  const {user}=useAuthContext();
const router=useRouter();
  const AiModelList = [
    {
      name: "GeminiGoogle",
      icon: "/google.png",
      modelName:"google/gemini-2.0-pro-exp-02-05:free"
    },
    {
      name: "Llama by Meta",
      icon: "/meta.png",
    },
    {
      name: "DeepSeek",
      icon: "/deepseek.png",
    },
  ];

  // Function to handle image selection
  function onImageSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files[0]) {
      setSelectedFile(files[0]); // Store file
      const imageUrl = URL.createObjectURL(files[0]);
      setPreviewUrl(imageUrl);
    }
  }

  // Cleanup URL.createObjectURL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Function to handle "Convert to Code" button click
  async function onConvertToCodeButton() {
    const uid = uuid4();
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }
setLoading(true);
    try {
      const uploadedUrl = await uploadToCloudinary(selectedFile);
      if (uploadedUrl) {
        console.log("File uploaded successfully:", uploadedUrl);
       

        
        console.log(user?.email);
        console.log(uid,model,description,uploadedUrl);
        const result = await axios.post("/api/wireframe-to-code", {
          uid:uid,
          imageUrl: uploadedUrl,
          model,
          description,
          email:user?.email,
          
        });
        console.log("ans is:",result?.data)

        console.log("API Response:", result.data);
       
      }
    } catch (error) {
      console.error("Error during upload or API call:", error);
      alert("An error occurred. Please try again.");
    }
    setLoading(false);
    router.push('/view-code/'+ uid);
  }

  return (
    <div className="mt-10">
     
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image Selection Box */}
          {!previewUrl ? (
          <div className="p-7 border border-dashed rounded-md shadow-md flex flex-col items-center justify-center">
            <CloudUpload className="h-10 w-10 text-primary" />
            <p className="text-gray-400 mt-3">Click Button to Select Wireframe Image</p>
            <div className="p-5 border border-dashed w-full flex items-center justify-center mt-7">
              <label
                htmlFor="imageSelect"
                className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="imageSelect"
                onChange={onImageSelect}
                className="hidden"
                accept="image/*" // Restrict to image files
              />
            </div>
          </div> ) : (
        <div className="p-5 border border-dashed relative">
          <X
            onClick={() => setPreviewUrl(null)}
            className="absolute top-2 right-2 cursor-pointer"
            width={30}
          />
          <Image
            src={previewUrl}
            alt="Selected Image"
            width={500}
            height={500}
            className="w-full h-[300px] object-cover"
          />
        </div>
      )}

          <div className="p-7 border shadow-md rounded-lg">
            <h2 className="font-bold text-lg">Select AI Model</h2>
            <Select onValueChange={(value) => setModel(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {Constants?.AiModelList.map((model, index) => (
                  <SelectItem key={index} value={model.name}>
                    <div className="flex gap-2">
                      <Image
                        src={model.icon}
                        width={25}
                        height={25}
                        alt={model.name}
                      />
                      <h2>{model.name}</h2>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <h2 className="font-bold text-lg mt-5">Enter Description About Your Web Page</h2>
            <Textarea
              onChange={(e) => setDescription(e.target.value)}
              className="mt-3 h-[200px]"
              placeholder="Write about your web page..."
            />
          </div>
        </div>
     
      {/* Convert to Code Button */}
      <div className="mt-10 flex justify-center items-center" >
        <Button onClick={onConvertToCodeButton} disabled={loading}>
        {  loading?<Loader2Icon className="animate-spin"/>:
          <WandSparkles className="mr-2" /> }Convert to Code
        </Button>
      </div>
    </div>
  );
}

export default ImageUpload;