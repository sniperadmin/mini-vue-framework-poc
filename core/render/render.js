/**
 * @file handles all the rendering mechanism
 * for the dom string and converts it into a readable data structure
 * for other methods to consume
 * 
 * 
 * 
 * 
 * 
 * NOTE: For the String template literals, This version handles
 * only one parent with children
 * 
 * TODO: Add more mechanics for handling more than one parent
 * at the same object level
 */

import parse from 'html-dom-parser';
import deIndent from 'de-indent';

/** private helper function to loop the parsed dom
 * using html-dom-parser and clean it up
 * @function hydrateNodes
 * 
 * @param domString
 */
function hydrateNodes(domString) {
  if (domString) {
    const nodes = domString.filter(node => !(node.data && node.data === '\n' || node.data === '\n  '))

    nodes.forEach(node => {
      if (node.childNodes) {
        node.childNodes = hydrateNodes(node.childNodes)
      }
    })

    return nodes
  }
}


/**
 * NOTE: define our method for capturing and generating
 * nodes from a template string
 * @function parseComponent
 * @param template => should be HTML template
 * @returns {function h}
 */
export function parseComponent(template) {
  const cleanCode = deIndent(template);
  const parsedTemplate = parse(cleanCode, 'text/html')

  const cleanParentNode = hydrateNodes(parsedTemplate);

  const tag = cleanParentNode[0].name
  const props = cleanParentNode[0].attribs
  const children = cleanParentNode[0].childNodes

  return h(tag, props, children)
}

/**
 * NOTE: define our method for converting
 * nodes into a data structure
 * @function h
 * @param tag
 * @param props
 * @param children => [{ tag: '', props: {}, children: []}, { type: 'text', data: string }]
 *
 * @returns { object } contains all the processed params
 */
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
