"use client";
import { useAuthContext } from "@/app/provider";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DesignCard from "./_components/DesignCard";
import { RECORD } from "../../view-code/[uid]/page";
import { SkeletonCard } from "./_components/SkeletonCard";

function Designs() {
  const { user } = useAuthContext();
  const [wireframeList, setWireframeList] = useState<RECORD[]>([]);
  const [loading, setLoading] = useState(true);

  const GetAllUserWireframe = async () => {
    setLoading(true);
    try {
      if (!user?.email || !user?.uid) {
        console.error("❌ Error: User email or UID is missing!");
        return;
      }

      console.log("📩 Fetching data for:", user.email, "UID:", user.uid);

      const result = await axios.get(
        `/api/wireframe-to-code?email=${encodeURIComponent(user.email)}&uid=${user.uid}`
      );

      console.log("✅ Data received:", result.data);
      setWireframeList(result.data);
    } catch (error: any) {
      console.error("❌ Error fetching wireframes:", error.response?.data || error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) GetAllUserWireframe();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div>
      {wireframeList.length === 0 ? (
        <div className="text-gray-600 text-center mt-10">You have not added any designs yet</div>
      ) : (
        <div>
          <h2 className="font-bold text-2xl mb-4">Wireframes and Codes</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {wireframeList.map((item: RECORD, index) => (
              <DesignCard key={index} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Designs;
