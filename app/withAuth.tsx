"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/configs/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";

export default function withAuth(Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          toast.error("Please log in first!"); // Show toast message
          setTimeout(() => {
            router.push("/"); // Redirect after a slight delay
          }, 1000);
        } else {
          setAuthenticated(true);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }, [router]);

    if (loading) return null; // Prevents flickering
    if (!authenticated) return <Toaster />; // Ensure toast is mounted

    return (
      <>
      <Toaster
  position="top-center"
  toastOptions={{
    style: {
      background: "rgba(255, 255, 255, 0.2)", // Semi-transparent white
      backdropFilter: "blur(10px)", // Blur effect
      color: "#3b82f6", // Tailwind primary blue (you can customize)
      marginTop: "-200px", // Moves it up
      borderRadius: "8px",
      padding: "12px",
      fontWeight: "bold",
    },
  }}
/>
        <Component {...props} />
      </>
    );
  };
}
