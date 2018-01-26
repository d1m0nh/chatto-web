/**
 * @flow
 */

"use strict";

import React, { Component } from "react";

type Props = {
  src: any,
  ports: any,
  flags: any
};

class ElmComponent extends Component<Props> {
  initialize(node) {
    if (node === null) {
      return;
    }

    let app = this.props.src.embed(node, this.props.flags);

    if (typeof this.props.ports !== "undefined") {
      this.props.ports(app.ports);
    }
  }

  componentDidMount() {
    this.initialize(this.node);
  }

  render() {
    return <div ref={div => (this.node = div)} />;
  }
}

export default ElmComponent;
