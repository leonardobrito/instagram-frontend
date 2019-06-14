/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import io from 'socket.io-client';
import api from '../services/api';
import './Feed.css';
import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

class Feed extends Component {
  state = {
    feed: [],
  };

  async componentDidMount() {
    this.registerToSocket();
    const response = await api.get('posts');
    this.setState({ feed: response.data });
  }

  registerToSocket = () => {
    const { feed } = this.state;
    const socket = io('http://localhost:5000');
    socket.on('post', (newPost) => {
      this.setState({ feed: [newPost, ...feed] });
    });

    socket.on('like', (likedPost) => {
      this.setState({
        feed: feed.map(post => (post._id === likedPost._id ? likedPost : post)),
      });
    });
  };

  handleLike = (id) => {
    api.post(`posts/${id}/like`);
  };

  render() {
    const { feed } = this.state;
    return (
      <section id="post-list">
        {feed.map(post => (
          <article key={post._id}>
            <header>
              <div className="user-info">
                <span>{post.author}</span>
                <span className="place">{post.place}</span>
              </div>
              <img src={more} alt="more" />
            </header>
            <img src={`http://localhost:5000/files/${post.image}`} alt="" />
            <footer>
              <div className="actions">
                <button type="button" onClick={() => this.handleLike(post._id)}>
                  <img src={like} alt="like" />
                </button>
                <img src={comment} alt="comment" />
                <img src={send} alt="send" />
              </div>
              <strong>
                {post.likes}
                {' '}
curtidas
              </strong>
              <p>
                {post.description}
                <span>{post.hashtags}</span>
              </p>
            </footer>
          </article>
        ))}
      </section>
    );
  }
}

export default Feed;
