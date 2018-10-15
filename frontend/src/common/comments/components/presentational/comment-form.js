import React from 'react'

import { get } from 'lodash'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

import ManageComment from '../smart/manage-comment'
import { USER_COMMENT_MUTATION } from '../../mutations'


class CommentForm extends React.Component {
  state = {
		prevCommentId: this.props.commentId,
		text: this.props.defaultText,
	}

  static getDerivedStateFromProps(props, state) {
    if (props.commentId !== state.prevCommentId) {
      return {
				prevCommentId: props.commentId,
				text: props.defaultText,
      }
    }
    return null
  }

  onChange = (e, {value}) => this.setState({ text: value })

  onSubmit = () => {
    const { onSubmit } = this.props
    this.setState({ text: '', commentId: '' })
    if (onSubmit) onSubmit()
  }

  render() {
    const { text } = this.state
    const { commentItem, commentId, mode, onCancel } = this.props

    return (
      <Form>

        {mode === 'add' && (
          <React.Fragment>
            <Form.TextArea
              placeholder="Write your comment..."
              value={text}
              autoHeight
              onChange={this.onChange}
            />
            <ManageComment
              mutation={USER_COMMENT_MUTATION}
              variables={{
                text,
                app: get(commentItem, 'app'),
                model: get(commentItem, 'model'),
                objectId: get(commentItem, 'objectId'),
              }}
              onCompleted={this.onSubmit}
            >
              <Form.Button
                content="Comment"
                icon="send"
                primary
                floated="right"
                size="tiny"
              />
            </ManageComment>
          </React.Fragment>
        )}

        {mode === 'edit' && (
          <React.Fragment>
            <Form.Field>
              <Form.TextArea
                autoHeight
                rows={1}
                value={text}
                onChange={this.onChange}
              />
            </Form.Field>
            <Form.Group style={{marginBottom: '0'}}>
              <Form.Button
                content="Cancel"
                type="button"
                size="tiny"
                onClick={onCancel}
              />
              <ManageComment
                mutation={USER_COMMENT_MUTATION}
                variables={{id: commentId, text}}
                onCompleted={this.onSubmit}
              >
                <Form.Button
                  content="Save Changes"
                  icon="checkmark"
                  positive
                  size="tiny"
                />
              </ManageComment>
            </Form.Group>
          </React.Fragment>
        )}

      </Form>
    )
  }
}


CommentForm.propTypes = {
  mode: PropTypes.oneOf(['add', 'edit']).isRequired,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  commentId: PropTypes.string,
  defaultText: PropTypes.string,
  commentItem: PropTypes.shape({
    app: PropTypes.string,
    model: PropTypes.string,
    objectId: PropTypes.number,
  }),
}


export default CommentForm
