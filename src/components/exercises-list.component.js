import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Exercise = (props) =>
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{(new Date(props.exercise.date)).toDateString()}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#"
        onClick={() => props.deleteExercise(props.exercise._id)}
      >delete</a>
    </td>
  </tr>


export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = {
      exercises: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/exercises/', { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        this.setState({
          exercises: data
        });
      })
      .catch(err => console.error(err));
  }

  deleteExercise(id) {
    fetch('http://localhost:5000/exercises/'+id, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => console.info(data))
      .catch(err => console.error(err));

    this.setState({
      exercises: this.state.exercises.filter(e => e._id !== id)
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table table-hover">
          <thead className="thead-light bg-teal">
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Description</th>
              <th scope="col">Duration</th>
              <th scope="col">Date</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.exercises.map(exercise =>
              <Exercise
                exercise={exercise}
                deleteExercise={this.deleteExercise}
              />)
            }
          </tbody>
        </table>
      </div>
    )
  }
}
