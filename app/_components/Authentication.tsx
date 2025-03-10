"use client";
import { auth } from "@/configs/firebaseConfig";
import { GoogleAuthProvider, signInWithRedirect, signInWithPopup } from "firebase/auth";
import React from "react";

function Authentication({ children }: any) {
    const provider = new GoogleAuthProvider();

    const onButtonPress = () => {
        if (window.innerWidth <= 768) {
            // Use redirect for mobile devices
            signInWithRedirect(auth, provider);
        } else {
            // Use popup for desktop
            signInWithPopup(auth, provider)
                .then((result) => {
                    const credential: any = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    const user = result.user;
                    console.log(user);
                })
                .catch((error) => {
                    console.error("Error:", error.message);
                });
        }
    };

    return <div onClick={onButtonPress}>{children}</div>;
}

export default Authentication;
