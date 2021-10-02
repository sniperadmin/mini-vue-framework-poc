import { reactive, h } from "../index"

export default {
  // NOTE: Basic reactivity system done~!
  data: reactive({
    count: 0,
    // NOTE: Edit this for switching between
    // different types of render engines
    templateRender: false
  }),


  render() {
    // NOTE: this renders correctly
    if (!this.data.templateRender) {
      return h('div', { class: 'bg-light', style: 'padding: 2rem; height: 100vh;' },
        [
          h('h2', {}, 'Welcome to Experimental mini Vue'),
          h('h4', {}, 'A practice by => Nasr Galal'),
          h('button', { onClick: () => { this.data.count++ }, class: 'btn btn-primary' }, 'Click Here'),
          h('h1', { class: 'red' }, String(this.data.count)),
        ]
      )
    } else {
      // NOTE: Missing handling events here in the template string
      const template = `
        <div class="container">
          <button class="btn btn-primary">
            <span class="red">
              text
            </span>
          </button>
        </div>
      `
      return template;
    }
  }
}
