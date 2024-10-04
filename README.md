# aweseome-astro-prometheus

- [js-yaml](https://bundlephobia.com/package/js-yaml@4.1.0) for parsing the YAML data from [samber/awesome-prometheus-alerts](https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/refs/heads/master/_data/rules.yml).
- TailwindCSS for styling.
- [astro-icon](https://www.astroicon.dev/getting-started/) for icons. Since this uses iconify sets underneath, should be easy to replicate across frameworks, if needed.

## Sidenotes
- It might be a good idea to convert the YAML to JSON and store it in the repo instead of fetching it here. That is what they are doing in the [build step](https://github.com/samber/awesome-prometheus-alerts/blob/35596c866f129e3134f7ac705e90f50002dae073/.github/workflows/dist.yml#L32) anyway. I wonder why they store the default in YAML if they end up converting it to JSON anyway.
- [Simple Icons](https://simpleicons.org/) has no color by default.
- The type scale is a little messy at the moment. It would be nice to set the tailwind config to constraint colors in the project.
- I never noticed this before but Astro components and `<script>` tags within them cannot share variables directly which is a bit of a pain. Probably for good reason though.
- Fixed width on the logo might be better. That way we can have a common variable across the project for `head.title` and contents of the logo. However, the logo will not scale down on smaller sizes with the current setup.