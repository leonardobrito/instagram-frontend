import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import './New.css';

class New extends Component {
  static propTypes = {
    history: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  state = {
    image: null,
    author: '',
    place: '',
    description: '',
    hashtags: '',
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      image, author, place, description, hashtags,
    } = this.state;
    const data = new FormData();
    data.append('image', image);
    data.append('author', author);
    data.append('place', place);
    data.append('description', description);
    data.append('hashtags', hashtags);
    try {
      await api.post('posts', data);
      const { history } = this.props;
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  handleImageChange = (event) => {
    this.setState({ image: event.target.files[0] });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      author, place, description, hashtags,
    } = this.state;
    return (
      <form id="new-post" onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.handleImageChange} />
        <input
          type="text"
          name="author"
          placeholder="Author"
          onChange={this.handleChange}
          value={author}
        />
        <input
          type="text"
          name="place"
          placeholder="Place"
          onChange={this.handleChange}
          value={place}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={this.handleChange}
          value={description}
        />
        <input
          type="text"
          name="hashtags"
          placeholder="Hashtags"
          onChange={this.handleChange}
          value={hashtags}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default New;
