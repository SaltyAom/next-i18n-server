# Default Language Proof of Concept
Automatically generate language page for Next.js

## Outline
[Using to concept of page fallback.](https://github.com/SaltyAom/next-default-lang) But instead of manual created page and consume our sanity. We can simply create normal path and let the script generate the INTL structure.

Due to nextjs use `pages` as router. We've to use another folder name like `routes` to generate `pages` structure.

So creating these structre in `routes` like these:
```
| routes
| -
  | - index.tsx
  | - test.tsx
  | - a
    | - [test]
      | - a.tsx
```

Would generate the i18n with structure like this with props of `lang` of `en` fallback:
```
| routes
| -
  | - index.tsx
  | - test.tsx
  | - a
  | | - [test]
  |   | - a.tsx
  |
  | - [lang]
    | - index.tsx
    | - test.tsx
    | - a
      | - [test]
        | - a.tsx
```

Which will result the param as
/`Optional language`
/`Optional language`/test
/`Optional language`/a/hi/a

The server will auto-generate for only changed file and reflect to the Next.js server immediately.

## Usage 
To dev:
```
node intl/intl.js
```

To build pages:
```
node intl/intl.js build
```