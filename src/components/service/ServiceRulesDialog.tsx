
import { Dialog, DialogHeader, DialogContent, DialogTrigger, DialogClose } from "../ui/dialog";
import { camelCase, upperFirst } from "lodash-es";
import type { Service, Rule } from "src/pages/index.astro";
import { Button } from "../ui/button";
import { SiDocker, SiMysql, SiNetdata, SiPostgresql, SiPrometheus, SiRedis, SiVmware, SiWindows } from "react-icons/si";
import { PiPuzzlePieceFill, PiX } from "react-icons/pi";
import { Badge } from "../ui/badge";

function getYamlForRule(rule: Rule): string {
    const summaryFallback = () =>
        `${rule.name} (instance {{ $labels.instance }})`;
    // UpperCamelCase rule.name
    const alert = upperFirst(camelCase(rule.name).replace(" ", ""));

    //
    const comments =
        "comments" in rule
            ? // Comments in YML converted to JSON adds \n to it. The slice removes a trailing \n that is not needed here.
            rule.comments
                .split("\n")
                .slice(0, -1)
                .map((comment) => `# ${comment.trim()}\n`)
                .join("")
            : "";

    return `${comments}- alert: ${alert}
  expr: '${rule.query}'
  for: ${rule.for ?? "0m"}
  labels:
    severity: ${rule.severity}
  annotations:
    summary: ${"summary" in rule && rule.summary ? rule.summary : summaryFallback()}
    description: "${rule.description.replace('"', '"')} \\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}"`;
}


export function ServiceRulesDialog({ service }: { service: Service }) {

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
            {
                service.exporters.map((exp) => {
                    return (
                        <div slot="body">
                            <h2>{exp.slug}</h2>
                            {exp.rules?.map((rule, index) => {
                                return (
                                    <section className="grid grid-cols-[min-content_minmax(0,_1fr)] gap-4 mb-8">
                                        {/* Circular number indicator */}
                                        <div className="h-8 w-8 text-center leading-8 rounded-full text-emphasis-muted">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h3>{rule.name}</h3>
                                            <p>{rule.description}</p>
                                            <div className="rounded-md">
                                                {/* Copy */}
                                                <input
                                                    id={`value-${rule.name}`}
                                                    value={getYamlForRule(rule)}
                                                    readOnly
                                                    hidden
                                                />
                                                <button
                                                    id={`copy-${rule.name}`}
                                                    className="absolute right-4 rounded-br-none rounded-tl-none bg-white bg-opacity-50 border-none py-2 rounded-md text-sm uppercase"
                                                >
                                                    <span className="flex flex-row items-center">
                                                        {/* <Icon
                                                                class="inline mr-1"
                                                                name="ph:copy"
                                                            /> */}
                                                        <span>Copy</span>
                                                    </span>
                                                </button>
                                                {/* <Code
                                                        class="p-4"
                                                        code={getYamlForRule(rule)}
                                                        lang="yaml"
                                                        theme="catppuccin-latte"
                                                    /> */}
                                            </div>
                                        </div>
                                    </section>
                                );
                            })}
                        </div>
                    );
                })
            }
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

// import * as Si from 'react-icons/si';

export function ServiceIcon({ iconName }: { iconName: string }) {
    switch (iconName.toLowerCase()) {
        case 'prometheus':
            return <SiPrometheus />
        case 'docker':
            return <SiDocker />
        case 'windows':
            return <SiWindows />
        case 'netdata':
            return <SiNetdata />
        case 'vmware':
            return <SiVmware />
        case 'mysql':
            return <SiMysql />
        case 'postgresql':
            return <SiPostgresql />
        case 'redis':
            return <SiRedis />
        default:
            return <PiPuzzlePieceFill />
    }
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