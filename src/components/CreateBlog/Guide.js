const guideText = `
# Markdown Guide

# H1 - \`# H1\`
## H2 - \`## H2\`
### H3 - \`### H3\`
#### H4 - \`#### H4\`
##### H5 - \`##### H5\`
###### H6 - \`###### H6\`

# Horizontal Rules

___

---

***

## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~

## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar

## Code

Inline \`code\`

Block code "fences"

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

## Tables

| Option | Description |
| ------ | ----------- |
| lorem  | quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. |
| ipsum  | Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore |
| dolor  | Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| lorem  | quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. |
| ipsum  | Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore |
| dolor  | Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum |


## Links

[link text](https://bitclout.com)

[link with title](https://bitclout.com "title text!")

Autoconverted link https://bitclout.com

## Images

![Photo by Anna Tarazevich from Pexels](https://i.ibb.co/2j1R1dB/pexels-anna-tarazevich-5425611.jpg)
`;

export default guideText;