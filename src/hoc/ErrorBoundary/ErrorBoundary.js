import React,{Component} from 'react';

class ErrorBoundary extends Component {
    state = {
      error: false,
      errorInfo: null
    };
    componentDidCatch(error, errorInfo) {
      this.setState({
        error: error,
        errorInfo: errorInfo
      });
    }
  
    render() {
      if (this.state.error) {
        return (
          <div style={{ whiteSpace: "pre" }}>
            <h2>Something went wrong</h2>
            {this.state.error && this.state.error.toString()}
            <br />
            <p>Error occured {this.state.errorInfo.componentStack}</p>
          </div>
        );
      }
  
      return this.props.children;
    }
  }

  export default ErrorBoundary;