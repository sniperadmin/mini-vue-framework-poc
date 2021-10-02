import { mount, patch, parseComponent } from "./";
import {watchEffect} from "../reactivity/reactive"

export function mountApp(component, container) {
  let isMounted = false;
  let vdom;

  watchEffect(() => {
    if (!isMounted) {
      console.log('component', typeof component.render());

      if (typeof component.render() === 'object') {
        vdom = component.render();
      } else {
        vdom = parseComponent(component.render())
      }
      mount(vdom, container)
      isMounted = true;
    } else if (isMounted) {
      // if there is actually an old vdom
      let newVdom

      if (typeof component.render() === 'object') {
        newVdom = component.render()
      } else {
        newVdom = parseComponent(component.render())
      }
      patch(vdom, newVdom)
      vdom = newVdom
    }
  })
}
