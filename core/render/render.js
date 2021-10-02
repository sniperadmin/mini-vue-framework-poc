import parse from 'html-dom-parser';
import deIndent from 'de-indent';

const firstName = "Marvin";
const lastName = "Frachet";
const template = `
  <div>
    <p class="red">
      Hello ${firstName} ${lastName}!
    </p>
    <span>
      meow
    </span>
  </div>
`


parseHTML(template)

function hydrateNodes(dom) {
  if (dom) {
    const nodes = dom.filter(node => !(node.data && node.data === '\n' || node.data === '\n  '))

    nodes.forEach(node => {
      if (node.childNodes) {
        node.childNodes = hydrateNodes(node.childNodes)
      }
    })

    return nodes
  }
}



export function parseHTML(template) {
  const cleanCode = deIndent(template);
  const parsedTemplate = parse(cleanCode, 'text/html')

  const cleanParentNode = hydrateNodes(parsedTemplate);

  const tag = cleanParentNode[0].name
  const props = cleanParentNode[0].attribs
  const children = cleanParentNode[0].childNodes

  return h(tag, props, children)
}


export function h(tag, props, children) {
  const hydratedChildren = children

  hydratedChildren.forEach(c => {
    if (c.type === 'tag') {
      hydratedChildren[hydratedChildren.indexOf(c)] = h(c.name, c.attribs, c.children)
    } else if (c.type === 'text') {
      console.log(c.data);
      hydratedChildren[hydratedChildren.indexOf(c)] = c.data
    }
  })

  return {
    tag,
    props,
    children
  }
}
