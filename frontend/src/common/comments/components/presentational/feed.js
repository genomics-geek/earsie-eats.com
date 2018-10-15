import React, { Component } from 'react'

import { get, map } from 'lodash'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Button, Dimmer, Feed, Icon, Loader, Segment } from 'semantic-ui-react'

import CommentForm from './comment-form'
import ManageComment from '../smart/manage-comment'
import { DELETE_USER_COMMENT_MUTATION } from '../../mutations'


class CommentsFeed extends Component {
  state = { editId: '' }

  onClickEdit = editId => this.setState({ editId })

  onReset = () => this.setState({ editId: '' })

  render() {
    const { currentUser, commentItem, comments, loading, hasNextPage, onLoadMore, refetch } = this.props
    const { editId } = this.state

    const currentUserId = get(currentUser, 'id')

    if (loading) {
      return (
        <Segment basic padded="very">
          <Dimmer inverted active>
            <Loader indeterminate content="Loading comments..." />
          </Dimmer>
        </Segment>
      )
    }

    return (
      <Segment basic>
        {currentUserId && <CommentForm mode="add" commentItem={commentItem} onSubmit={refetch} />}

        <Feed style={{ paddingBottom: '5%' }}>
          {map(comments, comment => {
            const commentId = get(comment, 'node.id')
            const userId = get(comment, 'node.user.id')
            const username = get(comment, 'node.user.username')
            const created = moment(get(comment, 'node.created')).fromNow()
            const text = get(comment, 'node.text')

            return (
              <Feed.Event key={commentId}>
                <Feed.Label icon="user circle" />
                <Feed.Content>
                  <Feed.Summary>
                    <Feed.User content={username} /> posted
                    <Feed.Date content={created} />
                    &nbsp; &nbsp;
                    {userId === currentUserId && (
                      <React.Fragment>
                        <Icon
                          name="edit"
                          style={{ cursor: 'pointer' }}
                          onClick={() => this.onClickEdit(commentId)}
                        />
                        <ManageComment
                          mutation={DELETE_USER_COMMENT_MUTATION}
                          variables={{ id: commentId }}
                          onCompleted={refetch}
                        >
                          <Icon
                            name="delete"
                            color="red"
                            style={{ cursor: 'pointer' }}
                          />
                        </ManageComment>
                      </React.Fragment>
                    )}
                  </Feed.Summary>
                  {editId === commentId ? (
                    <CommentForm
                      mode="edit"
                      commentId={commentId}
                      defaultText={text}
                      onCancel={() => this.onReset()}
                      onSubmit={() => this.onReset()}
                    />
                  ): (
                    <Feed.Extra text content={text} />
                  )}
                </Feed.Content>
              </Feed.Event>
            )
          })}
        </Feed>

        {hasNextPage ? (
          <Button
            fluid
            content="+ LOAD MORE"
            onClick={onLoadMore}
            loading={loading}
          />
        ) : (
          <Button
            fluid
            content="- END -"
            disabled
            loading={loading}
          />
        )}
      </Segment>
    )
  }
}


CommentsFeed.propTypes = {
  loading: PropTypes.bool,
  hasNextPage: PropTypes.bool,
  onLoadMore: PropTypes.func.isRequired,
  refetch: PropTypes.func,
  commentItem: PropTypes.shape({
    app: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    objectId: PropTypes.number.isRequired,
  }).isRequired,
	comments: PropTypes.arrayOf(PropTypes.shape({
		node: PropTypes.shape({
			id: PropTypes.string,
			text: PropTypes.string,
      user: PropTypes.shape({
        id: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
        isStaff: PropTypes.bool,
      })
		})
	})),
  currentUser: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    isStaff: PropTypes.bool,
  })
}


CommentsFeed.defaultProps = {
  loading: false,
  hasNextPage: false,
}


export default CommentsFeed
