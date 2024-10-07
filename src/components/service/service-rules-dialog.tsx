'use client';

import { Dialog, DialogHeader, DialogContent, DialogTrigger, DialogClose } from "../ui/dialog";
import type { Service } from "src/pages/index.astro";
import { Button } from "../ui/button";
import { PiPuzzlePieceFill, PiX } from "react-icons/pi";
import { Badge } from "../ui/badge";
import { useState, type ReactNode } from "react";

/**
 * Dialog component, `children` object shows exporter.rules
 * Since the content within exporter.rules is mostly static, it is rendered by Astro at build time.
 */
export function ServiceRulesDialog({ service, children }: { service: Service, children: ReactNode }) {
    return (<Dialog key={service.name}>
        <DialogTrigger asChild>
            <Button
                variant={"outline"}
                className="block w-full">View Alert Rules</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader className="flex flex-row items-center gap-4">
                <div className="flex flex-row items-center gap-2 flex-grow">
                    <ServiceHeader service={service} />
                    <ServiceTag service={service} />
                </div>
                <DialogClose asChild>
                    <Button type="button" variant="ghost">
                        <PiX />
                    </Button>
                </DialogClose>
            </DialogHeader>
            {children}
        </DialogContent>
    </Dialog>);
}

export function ServiceHeader({ service }: { service: Service }) {
    return (
        <div className="flex flex-row gap-2 items-center">
            <ServiceIcon
                iconName={service.name.split(" ")[0] ?? ""}
            />
            <h3 className="font-semibold">{service.name}</h3>
        </div>
    )
}



export function ServiceIcon({ iconName }: { iconName: string }) {
    // State for errors in the img element
    const [hasError, setHasError] = useState(false);
    const normalizedIconName = iconName.toLowerCase();

    return hasError ? (
        <PiPuzzlePieceFill className="h-8 w-8 fill-secondary-foreground" /> // Render the fallback component when there is an error
    ) :( <img className="h-8 w-8" src={`https://cdn.simpleicons.org/${normalizedIconName}`} onError={() => setHasError(true)} />)
}


export function ServiceTag({ service }: { service: Service }) {
    function getRuleCount(service: Service): number {
        // 0 if all exporters in service have no/null rules
        return (
            service.exporters
                .map((exporter) => {
                    return exporter.rules?.length;
                })
                .reduce((prev, cur) => {
                    return (prev ?? 0) + (cur ?? 0);
                }, 0) ?? 0
        );
    }

    return (<Badge variant={'secondary'}>{`${getRuleCount(service)} rules`}</Badge>)
}