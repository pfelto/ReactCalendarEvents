/* eslint-disable react/prop-types */
import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { myError: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { myError: error };
  }

  render() {
    if (this.state.myError) {
      // You can render any custom fallback UI
      return <h1>{this.state.myError.message}</h1>;
    }

    return this.props.children;
  }
}
