import React from 'react'

import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Divider, Dropdown, Icon, Menu } from 'semantic-ui-react'

import { Logout } from 'common/auth'


export const AppBar = ({ authenticated, username, email }) => (
  <Menu className="AppBar" pointing secondary stackable>
    <Menu.Item
      className="AppBar-item animated rollIn"
      name="home"
      as={NavLink}
      to="/app/home/"
    >
      <Icon name="food" color="blue" />
    </Menu.Item>
    <Menu.Item
      className="AppBar-item"
      name="about"
      icon="hand peace outline"
      as={NavLink}
      to="/app/about/"
    />
    <Menu.Item
      className="AppBar-item"
      name="blog"
      icon="comments outline"
      as={NavLink}
      to="/app/blog/"
    />

    <Menu.Menu position="right">
      <Menu.Item name="github">
        <a
          className="AppBar-link"
          href="https://github.com/genomics-geek/earsie-eats.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="github" link size="large" />
        </a>
      </Menu.Item>
      <Dropdown item icon={{ name: 'user circle outline', size: 'large' }} simple>
    		<Dropdown.Menu>
    			{authenticated
    				? (
    					<React.Fragment>
    						<Dropdown.Item text={username} disabled />
    						<Dropdown.Item text={email} disabled />
    						<Divider />
                <Logout><Dropdown.Item text="Sign off"/></Logout>
    					</React.Fragment>
    				) : (
    					<Dropdown.Item text="Sign in" as={NavLink} to="/login/" />
    				)
    			}
    		</Dropdown.Menu>
    	</Dropdown>
    </Menu.Menu>
  </Menu>
)


AppBar.propTypes = {
  authenticated: PropTypes.bool,
  username: PropTypes.string,
  email: PropTypes.string,
}


AppBar.defaultProps = {
  authenticated: false
}


export default AppBar
