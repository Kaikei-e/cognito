import {ExplicateIndex} from "@/app/explicate";
import React from "react";
import {SchemaIndex} from "@/app/schema";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-16 bg-fuchsia-50">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <ExplicateIndex/>
                <SchemaIndex/>
            </div>
        </main>
    );
}
