import React, { Component } from 'react';

const getDateString = (date) => {
  const year = date.getFullYear().toString();
  const month = date.getMonth().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    /* binding this for all of our methods */
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    this.setState({
      users: ['test user'],
      username: 'test user'
    });
  }

  onChangeUserName(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    });
  }

  onChangeDate(e) {
    const newValue = new Date(e.target.value);
    const newYear = newValue.getFullYear();
    const newMonth = newValue.getMonth();
    const newDate = newValue.getDate();

    const newDatetime = new Date(this.state.date);  // use constructor to copy

    /* set... modify date in place (and return milliseconds, which i'd have to
       keep converting, so) */
    newDatetime.setFullYear(newYear);
    newDatetime.setMonth(newMonth)
    newDatetime.setDate(newDate);

    this.setState({
      date: newDatetime
    });
  }

  onChangeTime(e) {
    const newHours = e.target.value.slice(0, 2);
    const newMinutes = e.target.value.slice(3, 5);

    const newDatetime = new Date(this.state.date);  // use constructor to copy

    newDatetime.setHours(newHours);
    newDatetime.setMinutes(newMinutes);
    newDatetime.setSeconds(0);  // reset so we don't keep the noise seconds created in the constructor

    this.setState({
      date: newDatetime
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };

    console.log(exercise);

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username: </label>
            <select className="form-control"
              id="username"
              name="username"
              required
              ref="userInput"
              value={this.state.username}
              onChange={this.onChangeUserName}>
              {
                this.state.users.map(
                  user => <option key={user} value={user}>{user}</option>
                )
              }
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description: </label>
            <input type="text" className="form-control"
              id="description"
              name="description"
              required
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration (in minutes): </label>
            <input type="number" className="form-control"
              id="duration"
              name="duration"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date: </label>
            <input
              id="date"
              className="form-control"
              type="date"
              name="date"
              value={getDateString(this.state.date)}
              onChange={this.onChangeDate}
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time: </label>
            <input
              id="time"
              className="form-control"
              type="time"
              name="time"
              value={
                this.state.date.getHours().toString().padStart(2, '0') +
                ':' +
                this.state.date.getMinutes().toString().padStart(2, '0')
              }
              onChange={this.onChangeTime}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    )
  }
}
