import PropTypes from 'prop-types'
import React from 'react'
import { Query, QueryResult } from 'react-apollo'
import { CURRENT_USER_QUERY } from '../gql/UserQuery'
import { JSXElement } from '@babel/types'

interface Props {
    props: {
        children: React.ReactNode | null
    }
}

const User: React.FC<Props> = props => (
    <Query {...props} query={CURRENT_USER_QUERY}>
        {(payload: QueryResult<any, Record<string, any>>) => props.children(payload)}
    </Query>
)

// User.propTypes = {
//     children: PropTypes.func.isRequired,
// }

export default User
