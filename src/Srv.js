class Srv {
  constructor() {
    this.srv = "http://localhost:3000";
    // this.srv = "https://baniak-blog-api.herokuapp.com";
  }
}

export default (new Srv()).srv;
