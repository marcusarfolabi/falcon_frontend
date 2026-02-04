import { Suspense } from "react";
import SuccessClient from "./SuccessClient";
import { Loader2 } from "lucide-react";

export default function SuccessPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                </div>
            }
        >
            <SuccessClient />
        </Suspense>
    );
}
