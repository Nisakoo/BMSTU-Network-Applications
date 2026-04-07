export class HeaderNavbar {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(data) {
    return `
      <div class="container-fluid mt-3">
          <a class="brand" href="/">
            <span class="brand__red">oil</span>
            <span class="brand__green">development</span>
          </a>
      </div>
    `;
  }

  render(data) {
    const html = this.getHTML(data);
    this.parent.insertAdjacentHTML("beforeend", html);
  }
}
