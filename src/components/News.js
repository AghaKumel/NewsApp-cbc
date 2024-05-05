import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'

export default class News extends Component {


  async updateNews(pageNO){
    
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=59354b1dbb194606b271c008b41302e1&page=${this.state.page}&pageSize=20`;
    let data=await fetch(url);
    let parseData=await data.json()
    console.log(parseData)
    this.setState({
      articles: parseData.articles, 
      totalResults:parseData.totalResults
    })
  }

  handlePrevClick=async()=>{
    this.setState({page:this.state.page-1})
    this.updateNews();
  }

  handleNextClick=async()=>{
    this.setState({page:this.state.page+1})
    this.updateNews();
  }

  async componentDidMount(){
    this.updateNews();
  }

  constructor(props)
  {
    super(props);
    this.state={
      articles:[],
      loading:false,
      page:1,
      pageSize:20
    }
    document.title="NewsApp-"+this.props.category;
  }
  static defaultProps={
    country:'in',
    category:'general'
  }

  static propTypes={
    country:PropTypes.string,
    category:PropTypes.string
  }


  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center my-5'>NewsApp - Top {this.props.category} HeadLines</h1>
        <div className='row'>
            {this.state.articles.map((ele)=>{
              return <div className="col-md-4" key={ele.url} >
                <NewsItem title={ele.title?ele.title:" "} discription={ele.description?ele.description:" "} imgUrl={ele.urlToImage?ele.urlToImage:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAaVBMVEX///8AAADs7Oz7+/uFhYXj4+P39/eNjY3W1taRkZHR0dEtLS19fX2VlZXg4OCIiIgoKCg0NDQgICCtra0+Pj4bGxubm5tDQ0MSEhKkpKRJSUnJycm2trZ2dnZRUVEJCQnAwMBpaWlZWVncDv32AAADvUlEQVR4nO2abX+6LBSAJ+ZDWJrlLDOf+v4f8j8TpyEiCNju332uF3uxZVwDPHDgfH0BAAAAAAAAAAAAAAAAwBdC+JKlx479GE+M/Tvkm45pVvvIXaWE94llkGfmSCvZ6cmkUsu1lpUqTCu1ZHJO2RZOlhXKOCGj02mg+YMdZZ2xuJN96J8KCi8lQaGLA/toYLeWouy/X2JWoTt5Jp2GE1sDLvLJu+2JS4Xf0o/IcuxaaMRjqE86CpmTyrsWSvEmiNRp3VIghNM1cZeWutvmpFDXxFV8rdlOKpGWulJSbsufknJzL6l+Ateh1jL9V0slo24Jm6oPeM/8j0g9zqPFoUq1ScUKUg9qzTp+TirupdyKkrIkFlJTUgfaySpV30JlqTCeSFmPT0kFRIqeUS2RYmBVljoypCQWLSNSLiuJCBa/zeFqK0s1K6RQk1x520pVKXvHkFrYCOWvYFvMv6NEKhDPZ6j9FCuN2HEnOg66TxX6pc5EKv+eSnFDwhBDImNSjHSZGzzxKK7N9ai6lDOR4m0UwrdMdqav1KUms2on7GRZe+anHHUpysrjzHJ/kvEz+0peCndPfA9Sdj1q5cKZUA7jFILVVzqkfiZBFLcbmFuw48U7euxmrfRI/UT2Okuzmrtn8a8sJ9YI6pJaxmHscWb6ikidjEv5s07Td2MrKcw9aaOiyGqpm5SUE/Cc6BHcRgovOFErziZSmDOfWCO4hVS42E/UCGqXQiG9w8vP8yZjDr8jqFvKL63yPRnNhfrpZWVIKmyjdjDeu/jCTkPCr1cKk23o5fc3teDYvehPzrVKDb3SW9VyN0sP/VLjlcR7/fkh009GpPDb8UuSh/707MOw1GTtw/RIxYw8R0pKfesycVrDRa8U1qCkW2p5xTUrNc1mxFeSLaX8ybHn56XYWYqClIYMmbf7/pQU0uekLNWfTzHPF/VIrT+I1Xr3rkkKlfNNfExqejoFUpRU/H+TchWlkJ6VmPBQlEo4Nw6fltIbp96l1t8hy+R1S5SOqlSfZOPm/iwi71WbdHhRjH4SOKVJfS1jFGX9WrdaaqhLaOuLhJ8WQoOUfoiUfK1LInWSt5GUZVCK1E/Jlypxr4UUIZn1U1wqvJH/w1hX+SQ34tyd0vwWCp5SxwRh1IctiaoZ5q2xJqrb6Pyhkqm5uJiTeiOWqW6wn9tIydU86TnMWEK26I9V36LdSarIuiVs5A/EpIh5l76z5FlxPek61xhT3YIyevgrlFpcZArX4FoPAAAAAAAAAAAAAAAA/If4B/4LRFxJTWsQAAAAAElFTkSuQmCC"
              } newsUrl={ele.url} author={ele.author?ele.author:"Unknown"} date={ele.publishedAt?ele.publishedAt:"Unknown"}></NewsItem> 
              </div>
            })}
        </div>
        <div className='container d-flex justify-content-between'>
          <button type="button" className="btn btn-primary mx-3" onClick={this.handlePrevClick} disabled={this.state.page===1}>&larr; Previous</button>
          <button type="button" className="btn btn-primary mx-3" onClick={this.handleNextClick} disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.state.pageSize)}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
