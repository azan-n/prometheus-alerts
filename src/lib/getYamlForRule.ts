import type { Rule } from "@/pages/index.astro";
import { camelCase, upperFirst } from "lodash-es";

export function getYamlForRule(rule: Rule): string {
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