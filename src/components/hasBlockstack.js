import React from 'react';
import blockstack from 'blockstack';


const hasBlockstack = WrappedComponent =>
  class HasBlockstack extends React.Component {
    constructor() {
      super();
      this.blockstack = blockstack;
    }

    render () {
      return (
        <WrappedComponent
          blockstack={blockstack}
          {...this.props}
        />
      );
    }
  }

export default hasBlockstack;
