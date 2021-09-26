export function mount(vnode, container) {
  const el = vnode.el = document.createElement(vnode.tag);

  // SECTION: checking props
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key];

      if (key.startsWith('on')) {
        el.addEventListener(key.slice(2).toLowerCase(), value)
      }

      el.setAttribute(key, value)
    }
  }
  // SECTION: ./checking props


  // SECTION: checking children
  if (vnode.children) {
    if (typeof vnode.children === 'string') {
      el.textContent = vnode.children
    } else {
      vnode.children.forEach(child => {
        mount(child, el)
      })
    }
  }
  // SECTION: ./checking children

  container.appendChild(el);
}
