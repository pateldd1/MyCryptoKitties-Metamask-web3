const React = require('react');
const styles = require('./App.css');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }
  render() {
    return (
      <div className={styles.app}>
        bar
      </div>
    );
  }
}

module.exports = App;