import Layout from '../components/Layout'
import { withRouter } from 'next/router'
import CardList from '../components/CardList/'
import TopicNavbar from '../components/Navbar/'
import Link from 'next/link'
import React, { Component } from 'react'


class Bundle extends Component {

  constructor(props){
    super(props)
    this.state = {

    }
  }

  static async getInitialProps(context) {
  const idsString = context.query.ids;
    const idsArray = idsString.split(',')

    let items = []

    for (const id of idsArray) {
        const res = await fetch(process.env.LEAVES_API_URL + 'api/entries/'+id+'?access_token='+process.env.LEAVES_API_ACCESSTOKEN)
        const itemJsonObject = await res.json();
        items.push(itemJsonObject)
    }

    const tagRes = await fetch(process.env.LEAVES_API_URL 'api/tags?access_token=' + process.env.LEAVES_API_ACCESSTOKEN)
  const tagData = await tagRes.json()
  for (var i = 0; i < tagData.length; i++) {
    tagData[i]['tagslug'] = tagData[i].label.split('.').join('-')
    tagData[i]['title'] = tagData[i].label.split('.').join(' ')
  }


  var links = items

  for (var i = 0; i < links.length; i++) {
    if(links[i].domain_name === "www.youtube.com"){
      links[i].url = links[i].url.split("&url=")[1]
    }
  }
    
    return {
         list: links,
    tag: 'bundle',
    seoTitle: 'bundle',
    seoDesc: 'Resources list of the ',
    linksCunt: links.total,
    activePage: 0,
    queryTag: 'bundle',
    type: 'topic',
    tagsList: tagData
    }
  }


  render(props) {
    return (
     <div>
    <TopicNavbar />
    <Layout title={this.props.seoTitle} description={this.props.seoDesc}>
      <CardList data={this.props} />
    </Layout>
  </div>
    )
  }
}

export default Bundle