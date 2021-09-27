import {reactive, h } from "../index"

export default {
  // NOTE: Basic reactivity system done~!
  data: reactive({
    count: 0
  }),
  // TODO: Provide SFC templating option to create custom components
  // TODO: Work on options API
  render() {
    return h('div', { class: 'bg-light', style: 'padding: 2rem; height: 100vh;' },
      [
        h('h2', {}, 'Welcome to Experimental mini Vue'),
        h('h4', {}, 'A practice by => Nasr Galal'),
        h('button', { onClick: () => { this.data.count++ }, class: 'btn btn-primary' }, 'Click Here'),
        h('h1', { class: 'red' }, String(this.data.count)),
      ]
    )
  }
}
