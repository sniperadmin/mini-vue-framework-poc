export function patch(oldSnapshot, newSnapshot) {
  // SECTION: CASE#1 => same tags
  if (oldSnapshot.tag === newSnapshot.tag) {
    const el = newSnapshot.el = oldSnapshot.el;

    // SECTION: handling props
    const oldProps = oldSnapshot.props || {};
    const newProps = newSnapshot.props || {};

    for (const key in oldProps) {
      if (!(key in newProps)) {
        el.removeAttribute(key);
      }
    }

    for (const key in newProps) {
      const oldVal = oldProps[key];
      const newVal = newProps[key];

      if (newVal !== oldVal) {
        el.setAttribute(key, newVal);
      }
    }
    // SECTION: ./handling props

    // SECTION: handling children
    const oldChildren = oldSnapshot.children;
    const newChildren = newSnapshot.children;

    if (typeof newChildren === 'string') {
      if (typeof oldChildren === 'string') {
        if (newChildren !== oldChildren) {
          el.textContent = newChildren;
        }
      } else {
        el.textContent = newChildren;
      }
    } else {
      // oldChildren
      if (typeof oldChildren === 'string') {
        el.innerHTML = '';
        newChildren.forEach(child => {
          mount(child, el);
        })
      } else {
        // assuming that each children arrays compared have the same index
        const commonLength = Math.min(oldChildren.length, newChildren.length);

        for (let i = 0; i < commonLength; i++) {
          patch(oldChildren[i], newChildren[i]);
        }

        // if one of the arrays is different in length
        if (newChildren.length > oldChildren.length) {
          newChildren.length.slice(oldChildren.length).forEach(child => {
            mount(child, el)
          });
        } else if (newChildren.length < oldChildren.length) {
          oldChildren.length.slice(newChildren.length).forEach(child => {
            el.removeChild(child);
          })
        }
      }
    }
    // SECTION: ./handling children

    // SECTION: ./CASE#1 same tags
  } else {
    // replace the old snapshot tag with the new snapshot tag
    oldSnapshot = newSnapshot;
  }
}
