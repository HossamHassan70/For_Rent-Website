import { Col, Container, Nav, NavItem, NavLink, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userProfile.css';
import { useParams } from 'react-router-dom';
import Rev from '../Components/reviews';
import OwnerProfile from './OwnerProfile';
import OwnerProperties from '../Components/OwnerProperties';
import LoadingScreen from './loadingScreen';

const Emails = ({ userId }) => {
  const [emails, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <div>
      {loading ? (
        <>
          <LoadingScreen />
        </>
      ) : (
        <ul className="email-list">
          {emails.map(email => (
            <li key={email.id} className="email-item">
              <h3 className="email-title">{email.title}</h3>
              <p className="email-body">{email.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Posts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/users/${userId}/posts`);
        setPosts(response.data.posts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <div>
      {loading ? (
        <>
          <LoadingScreen />
        </>
      ) : (
        <ul className="post-list">
          {posts.map(post => (
            <li key={post.id} className="post-item">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-body">{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    axios.get(`https://dummyjson.com/users/${userId}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  // Handling middle column navbar
  const [activeNavItem, setActiveNavItem] = useState('posts');

  const handleNavItemClicked = (item) => {
    setActiveNavItem(item);
  };

  const renderContent = () => {
    switch (activeNavItem) {
      case 'posts':
        return <Posts userId={userId} />;
      case 'emails':
        return <Emails userId={userId} />;
      case 'reviews':
        return <Rev />;
      case 'requests':
        return <OwnerProfile />;
      default:
        return null;
    }
  };


  return (
    <Container fluid className='mt-3'>
      <Row>
        {/* left column */}
        <Col sm={12} md={4} xl={3}>
          <h4 className='col-name'>User Detail</h4>
          <div className="user-details-container d-flex justify-content-center">
            {userData ? (
              <div>
                <div className="circle-image text-center">
                  <img src={userData.image} alt="" className="rounded-circle img-thumbnail" />
                  <p className='title'>{userData.firstName}</p>
                  <p className='sub-title'>{userData.university}</p>
                </div>

                <div className="my-3 text-center icons-container">
                  <i className="profile-icon my-1 mx-2 far fa-edit"></i>
                  <i className="profile-icon my-1 mx-2 far fa-envelope"></i>
                  <i className="profile-icon my-1 mx-2 fas fa-phone-alt"></i>
                  <i className="profile-icon my-1 mx-2 fas fa-plus"></i>
                  <i className="profile-icon my-1 mx-2 fas fa-file-medical"></i>
                  <i className="profile-icon my-1 mx-2 far fa-calendar"></i>
                </div>

                <h5 className='sub-title my-2'>Information</h5>
                <div className="information-content pt-2">
                  <div className="flex-container">
                    <p><b>Full name: &#160;</b> {userData.firstName} {userData.lastName}, {userData.maidenName}</p>
                    <p><b>Email: &#160;</b> {userData.email}</p>
                    <p><b>City: &#160;</b> {userData.address.address}</p>
                    <p><b>Region: &#160;</b> {userData.address.city}</p>
                    <p><b>Phone: &#160;</b> {userData.phone}</p>
                    <p><b>Created at: &#160;</b> 15 Dec, 2023</p>
                  </div>
                </div>

              </div>
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
        </Col>

        {/* middle column */}
        <Col sm={12} md={8} xl={5}>
          <h4 className='col-name'>Activities</h4>

          <Nav className='custom-nav user-details-container d-flex justify-content-around' tabs>

            <NavItem>
              <NavLink
                className={activeNavItem === 'posts' ? 'active' : ''}
                onClick={() => handleNavItemClicked('posts')}
              >
                Posts
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={activeNavItem === 'emails' ? 'active' : ''}
                onClick={() => handleNavItemClicked('emails')}
              >
                Emails
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={activeNavItem === 'reviews' ? 'active' : ''}
                onClick={() => handleNavItemClicked('reviews')}
              >
                My Reviews
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={activeNavItem === 'requests' ? 'active' : ''}
                onClick={() => handleNavItemClicked('requests')}
              >
                My Requests
              </NavLink>
            </NavItem>

          </Nav>

          <div>
            {renderContent()}
          </div>

        </Col>


        {/* right column */}
        <Col sm={12} md={12} xl={4}>
          <h4 className='col-name'>Properties</h4>
          <OwnerProperties />
        </Col>

      </Row>
    </Container>
  );
};

export default UserProfile;