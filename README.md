# Notes from when it was just Astro
- [js-yaml](https://bundlephobia.com/package/js-yaml@4.1.0) for parsing the YAML data from [samber/awesome-prometheus-alerts](https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/refs/heads/master/_data/rules.yml).
- TailwindCSS for styling.
- [astro-icon](https://www.astroicon.dev/getting-started/) for icons. Since this uses iconify sets underneath, should be easy to replicate across frameworks, if needed.
- It might be a good idea to convert the YAML to JSON and store it in the repo instead of fetching it here. That is what they are doing in the [build step](https://github.com/samber/awesome-prometheus-alerts/blob/35596c866f129e3134f7ac705e90f50002dae073/.github/workflows/dist.yml#L32) anyway. I wonder why they store the default in YAML if they end up converting it to JSON anyway.
- [Simple Icons](https://simpleicons.org/) has no color by default.
- The type scale is a little messy at the moment. It would be nice to set the tailwind config to constraint colors in the project.
- I never noticed this before but Astro components and `<script>` tags within them cannot share variables directly which is a bit of a pain. Probably for good reason though.
- Fixed width on the logo might be better. That way we can have a common variable across the project for `head.title` and contents of the logo. However, the logo will not scale down on smaller sizes with the current setup.
- Ran into npm cli issues with package-lock.json https://github.com/npm/cli/issues/4828

# Notes from whence React came
- React in Astro is like async in JS, you make one function async and everything ends up being async. You make one component JSX and (almost) everything ends up being JSX.
- Using React with Astro prevents us from using astro-icon or the native syntax highlighting using the `Code` component.
- Dynamic icon imports are messy with React/any SPA. Importing a lot of icons will increase the page load time (unless we code-split well). We could rely on SVG imports through CSS to prevent bloating the bundle as is done with Iconify.
- Shiki seems to be biased toward running on the server, so I looked at [prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer) which feels like a lot of effort since we have to define how pre, code and other tags are rendered everytime.
- https://www.npmjs.com/package/react-syntax-highlighter is unable to import styles https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/509
- https://docs.astro.build/en/guides/framework-components/#can-i-use-astro-components-inside-my-framework-components
- https://docs.astro.build/en/guides/integrations-guide/react/#children-parsing experimentalReactChildren: true also breaks things

- Using React for searching is prone to the Blue/Green I mentioned earlier. This would mean the whole 'rules.json' gets loaded on the client, or requires dynamic fetching, which really depends on the requirement. The rules.json here hasn't changed in 2 years so it shouldn't matter (I guess?). 