import { mount, patch } from "./";
import {watchEffect} from "../reactivity/reactive"

export function mountApp(component, container) {
  let isMounted = false;
  let vdom;

  watchEffect(() => {
    if (!isMounted) {
      vdom = component.render()
      mount(vdom, container)
      isMounted = true;
    } else if (isMounted) {
      // if there is actually an old vdom
      const newVdom = component.render()
      patch(vdom, newVdom)
      vdom = newVdom
    }
  })
}
