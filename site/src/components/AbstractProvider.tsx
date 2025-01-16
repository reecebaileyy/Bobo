"use client";

import { AbstractWalletProvider } from "@abstract-foundation/agw-react";
import React from "react";

export default function AbstracProvider({ children }: { children: React.ReactNode }) {
    const config = {
        testnet: true, // Required
        // Optionally, provide your own RPC URL (learn more: https://viem.sh/docs/clients/transports/http.html)
        // transport: http("https://your.abstract.node.example.com/rpc") // Optional
    };

    return (
        <AbstractWalletProvider config={config}>
            {children}
        </AbstractWalletProvider>
    );
}