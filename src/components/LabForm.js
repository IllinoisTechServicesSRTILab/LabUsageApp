import React, {Component} from 'react';

class LabForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lab: 'DCL L416',
    };
    //When the user changes an option, the form will update
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //When the user clicks on an option, it sends that back up to the averages chart
  handleChange(event) {
    this.setState({lab: event.target.value});
    this.props.action(event.target.value);
  }

  handleSubmit(event) {
    //Nothing for now
  }

  render() {
    //Form object with all the major labs as options
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick a lab to view daily trends for:
          <select value={this.state.lab} onChange={this.handleChange}>
            <option value="DCL L416">DCL L416</option>
            <option value="DCL L440">DCL L440</option>
            <option value="EH 406B1">EH 406B1</option>
            <option value="EH 406B8">EH 406B8</option>
            <option value="GELIB 4C">GELIB 4C</option>
            <option value="GELIB 4E">GELIB 4E</option>
            <option value="MEL 1009">MEL 1009</option>
            <option value="SIEBL 0218">SIEBL 0218</option>
            <option value="SIEBL 0220">SIEBL 0220</option>
            <option value="English">English</option>
            <option value="Nevada">Nevada</option>
            <option value="Oregon">Oregon</option>
            <option value="Undergrad">Undergrad</option>
            <option value="Illini Union">Illini Union</option>
            <option value="Wohlers">Wohlers</option>
          </select>
        </label>
      </form>
    );
  }
}

export default LabForm;
