'use client';

import { Dialog, DialogHeader, DialogContent, DialogTrigger, DialogClose } from "../ui/dialog";
import type { Service } from "src/pages/index.astro";
import { Button } from "../ui/button";
import { SiApache, SiApachecassandra, SiApachehadoop, SiApachekafka, SiApachepulsar, SiCeph, SiClickhouse, SiCloudflare, SiConsul, SiDocker, SiEtcd, SiHashicorp, SiIstio, SiJenkins, SiJunipernetworks, SiKubernetes, SiLinkerd, SiMeilisearch, SiMinio, SiMongodb, SiMysql, SiNatsdotio, SiNetdata, SiNginx, SiNomad, SiOpenzfs, SiPostgresql, SiPrometheus, SiRabbitmq, SiRedis, SiSidekiq, SiSpeedtest, SiTraefikmesh, SiVmware, SiWindows } from "react-icons/si";
import { PiPuzzlePieceFill, PiX } from "react-icons/pi";
import { Badge } from "../ui/badge";
import type { ReactNode } from "react";


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
            <h3>{service.name}</h3>
        </div>
    )
}



export function ServiceIcon({ iconName }: { iconName: string }) {
    const ICON_MAP: Record<string, React.ElementType> = {
        prometheus: SiPrometheus,
        docker: SiDocker,
        windows: SiWindows,
        netdata: SiNetdata,
        vmware: SiVmware,
        mysql: SiMysql,
        postgresql: SiPostgresql,
        redis: SiRedis,
        mongodb: SiMongodb,
        rabbitmq: SiRabbitmq,
        elasticsearch: SiMeilisearch,
        meilisearch: SiMeilisearch,
        cassandra: SiApachecassandra,
        clickhouse: SiClickhouse,
        kafka: SiApachekafka,
        pulsar: SiApachepulsar,
        nats: SiNatsdotio,
        hadoop: SiApachehadoop,
        nginx: SiNginx,
        apache: SiApache,
        traefik: SiTraefikmesh,
        sidekiq: SiSidekiq,
        kubernetes: SiKubernetes,
        nomad: SiNomad,
        consul: SiConsul,
        etcd: SiEtcd,
        linkerd: SiLinkerd,
        istio: SiIstio,
        ceph: SiCeph,
        speedtest: SiSpeedtest,
        zfs: SiOpenzfs,
        minio: SiMinio,
        juniper: SiJunipernetworks,
        hashicorp: SiHashicorp,
        cloudflare: SiCloudflare,
        jenkins: SiJenkins,
        default: PiPuzzlePieceFill,
    };

    const COLOR_MAP: Record<keyof typeof ICON_MAP, string> = {
        prometheus: '#E6522C',
        netdata: '#00AB44',
        vmware: '#607078',
        docker: '#2496ED',
        postgresql: '#4169E1',
        redis: '#FF4438',
        elasticsearch: '#005571',
        rabbitmq: '#FF6600',
        mongodb: '#47A248',
        meilisearch: '#FF5CAA',
        vault: '#FFEC6E',
        cassandra: '#1287B1',
        clickhouse: '#FFCC01',
        kafka: '#231F20',
        pulsar: '#188FFF',
        nats: '#27AAE1',
        
    }

    const normalizedIconName = iconName.toLowerCase();
    const IconComponent = normalizedIconName in ICON_MAP ? ICON_MAP[normalizedIconName] : ICON_MAP.default;

    // Please Typescript.
    if (!IconComponent) {
        return null;
    }

    return <IconComponent color={normalizedIconName in COLOR_MAP ? COLOR_MAP[normalizedIconName] : null} className="h-8 w-8" />
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