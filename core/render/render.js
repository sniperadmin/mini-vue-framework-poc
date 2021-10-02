import parse from 'html-dom-parser';
import deIndent from 'de-indent';


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



export function parseComponent(template) {
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

  if (typeof hydratedChildren !== 'string') {
    hydratedChildren.forEach(c => {
      if (c.type && c.type === 'tag') {
        hydratedChildren[hydratedChildren.indexOf(c)] = h(c.name, c.attribs, c.children)
      }
    })
  }

  return {
    tag,
    props,
    children
  }
}
