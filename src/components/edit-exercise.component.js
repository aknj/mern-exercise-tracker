import React from 'react';
import CreateExercise from './create-exercise.component';

export default class EditExercise extends CreateExercise {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/users/', { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        const users = data.map(user => user.username);
        this.setState({
          users: users
        });
      })
      .catch(err => console.error(err));

    fetch('http://localhost:5000/exercises/'+this.props.match.params.id, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        this.setState({
          username: data.username,
          description: data.description,
          duration: data.duration,
          date: new Date(data.date)
        });
      })
      .catch(err => console.error(err));
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

    fetch('http://localhost:5000/exercises/'+this.props.match.params.id, { method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exercise)
    })
      .then(response => response.json())
      .then(data => {
        window.location = '/';
        console.info(data);
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <h3>Edit Exercise Log</h3>
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
              value={this.getDateString(this.state.date)}
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
            <input type="submit" value="Edit Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    )
  }
}
