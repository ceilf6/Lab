import React from 'react'
import Layout from '.'

export default () => (
  <Layout>
    <Layout.Header>
      <h1>Header</h1>
    </Layout.Header>

    <div>Main</div>

    <Layout.Footer>
      <p>Footer</p>
    </Layout.Footer>
  </Layout>
)