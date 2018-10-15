import React from 'react'

import { get } from 'lodash'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import Alert from 'common/alert'
import CommentsFeed from './components/presentational/feed'
import { USER_COMMENTS_QUERY } from './queries'


const UserComments = ({ app, model, objectId }) => (
	<Query
		query={USER_COMMENTS_QUERY}
		variables={{ app, model, objectId }}
		fetchPolicy="network-only"
		notifyOnNetworkStatusChange
	>
		{({ loading, error, data, fetchMore, refetch }) => {
			if (error) return <Alert type="error" message={`Authentication: ${error.message}`} />

			const comments = get(data, 'allUserComments.edges', [])
			const hasNextPage = get(data, 'allUserComments.pageInfo.hasNextPage', false)
			const cursor = get(data, 'allUserComments.pageInfo.endCursor')
			const currentUser = get(data, 'currentUser')

			const onLoadMore = () => {
				fetchMore({
					query: USER_COMMENTS_QUERY,
					variables: {
						cursor,
						app,
						model,
						objectId,
					},
					updateQuery: (previousResult, { fetchMoreResult }) => {
						const newEdges = get(fetchMoreResult, 'allUserComments.edges')
						const pageInfo = get(fetchMoreResult, 'allUserComments.pageInfo')

						return newEdges.length
						? {
							allUserComments: {
								__typename: get(previousResult, 'allUserComments.__typename'),
								edges: [...get(previousResult, 'allUserComments.edges', []), ...newEdges],
								pageInfo,
							}
						} : previousResult
					}
				})
			}

			return (
				<CommentsFeed
					loading={loading}
					hasNextPage={hasNextPage}
					onLoadMore={onLoadMore}
					refetch={refetch}
					comments={comments}
					currentUser={currentUser}
					commentItem={{app, model, objectId}}
				/>
			)
		}}
	</Query>
)


UserComments.propTypes = {
	app: PropTypes.string,
	model: PropTypes.string,
	objectId: PropTypes.number,
	userId: PropTypes.string,
}


export default UserComments
