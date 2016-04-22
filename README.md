# react-identification-card

Identification Standard Card(ISO/IEC 7810) Component that written in React.

> ISO/IEC 7810 Identification cards — Physical characteristics is an international standard that defines the physical characteristics for identification cards.[1]

Reference at [this standard](https://en.wikipedia.org/wiki/ISO/IEC_7810)

## Installation

```sh
$ npm install react-identification-card --save
```

## Properties

| property      | type    | description                     |
|---------------|---------|---------------------------------|
| className     | string  | the class name                  |
| format        | string  | "ID-1", "ID-2", "ID-3" and etc. |
| width         | number  | the width of this card          |
| color         | string  | the color of this card          |
| fillColor     | string  | the fill color of this card     |
| fillOpacity   | number  | the fill opacity of this card   |
| isEmpty       | bool    | flag if this card is empty      |
| viewMetadata  | func    | a function to render the detail |
| onClick       | func    | fired when clicked              |

## License

MIT
