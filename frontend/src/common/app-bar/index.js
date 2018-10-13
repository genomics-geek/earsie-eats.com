import React from 'react'

import { NavLink } from 'react-router-dom'
import { Icon, Menu } from 'semantic-ui-react'

import './index.css'


export const AppBar = () => (
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
    </Menu.Menu>
  </Menu>
)


export default AppBar
