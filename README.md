# aweseome-astro-prometheus

- [js-yaml](https://bundlephobia.com/package/js-yaml@4.1.0) for parsing the YAML data from [samber/awesome-prometheus-alerts](https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/refs/heads/master/_data/rules.yml).
- TailwindCSS for styling.


## Sidenotes
- It might be a good idea to convert the YAML to JSON and store it in the repo instead of fetching it here. That is what they are doing in the [build step](https://github.com/samber/awesome-prometheus-alerts/blob/35596c866f129e3134f7ac705e90f50002dae073/.github/workflows/dist.yml#L32) anyway. I wonder why they store the default in YAML if they end up converting it to JSON anyway.
- 