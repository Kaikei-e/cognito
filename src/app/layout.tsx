import {Providers} from './providers';
import RecoilProvider from './RecoilRootWrapper';
import React from "react";

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <RecoilProvider>
            <Providers>{children}</Providers>
        </RecoilProvider>
        </body>
        </html>
    );
}