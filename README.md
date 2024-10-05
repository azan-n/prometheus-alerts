# Notes
- React in Astro is like async in JS, you make one function async and everything ends up being async. You make one component JSX and (almost) everything ends up being JSX.
- Using React with Astro prevents us from using astro-icon or the native syntax highlighting using the `Code` component.
- Shiki seems to be biased toward running on the server, so I looked at [prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer) which feels like a lot of effort since we have to define how pre, code and other tags are rendered everytime.
- https://www.npmjs.com/package/react-syntax-highlighter is unable to import styles https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/509
- https://docs.astro.build/en/guides/framework-components/#can-i-use-astro-components-inside-my-framework-components
- https://docs.astro.build/en/guides/integrations-guide/react/#children-parsing experimentalReactChildren: true also breaks things

- Using React for searching is prone to the Blue/Green I mentioned earlier.