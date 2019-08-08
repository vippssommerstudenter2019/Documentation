import React from 'react';
import lottie from 'lottie-web';
import PropTypes from 'prop-types';

class LottieAnimation extends React.Component {
  ref = null;

  componentDidMount() {
    const { path } = this.props;
    lottie.loadAnimation({
      container: this.ref,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path,
    });
  }

  render() {
    return <div ref={(ref) => { this.ref = ref; }} />;
  }
}

LottieAnimation.propTypes = { path: PropTypes.object.isRequired };

export default LottieAnimation;
