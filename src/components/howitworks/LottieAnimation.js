import React from "react";
import lottie from "lottie-web";

class LottieAnimation extends React.Component {
    ref = null;
  
    componentDidMount() {
      lottie.loadAnimation({
        container: this.ref,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: this.props.path
      });
    }
  
    render() {
      return <div className={this.props.className} ref={ref => this.ref = ref} />;
    }
  }

export default LottieAnimation;