import Layout from '../components/Layout'
import TopicNavbar from '../components/Navbar/'
import axios from 'axios'
import CardList from '../components/CardList/'

class Search extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			showSearchBox: false,
			listA: null
		}
	}


	static async getInitialProps(context) {

		var page_no;
		if(context.query.page_no === undefined) {
			page_no = 1
		}else{
			page_no = context.query.page_no
		}

		const activePage = 1
		const searchingQuery = context.query.search_query

		const res = await fetch('https://ss346483-us-east-1-aws.searchstax.com/solr/leaves_anant_stage/select?q='+searchingQuery+'&rows=20&start='+ (page_no-1)*20)

		const data = await res.json();
		console.log(data.response.numFound)

		var links = data.response.docs

		for (var i = 0; i < links.length; i++) {
			if(links[i].domain_name === "www.youtube.com"){
				links[i].url = links[i].url.split("&url=")[1]
			}
		}

	return {
		list: links,
		tag: searchingQuery,
		seoTitle: searchingQuery,
		seoDesc: 'Resources list of the '+searchingQuery,
		linksCunt: parseInt(data.response.numFound),
		activePage: parseInt(page_no),
		queryTag: searchingQuery,
		type: 'searching'
	}
  }

	render(){
		console.log(this.props.linksCunt)
		return(
			<div>
				<TopicNavbar/>				
				<Layout title="Searching">
					<CardList data={this.props} />				
				</Layout>
			</div>
		)
	}
}

export default Search