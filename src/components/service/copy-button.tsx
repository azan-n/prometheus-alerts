import { PiCopy } from "react-icons/pi";
import { Button } from "../ui/button";
import { useState } from "react";


export function CopyButton({ content }: { content: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content).then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 1000); // Reset copied state after 1 seconds

        })
    };

    return (<Button
        variant={"ghost"}
        onClick={handleCopy}
        className="absolute right-4 rounded-br-none rounded-tl-none bg-opacity-50 rounded-md text-sm uppercase"
        disabled={copied}
    >
        <PiCopy className="inline align-middle mr-1" />
        {copied ? 'Copied!' :'Copy' }
    </Button>)

}