import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title,discription,imgUrl,newsUrl,author,date}=this.props; 
    return (
      <div>
        <div className='my-3'>
          <div className="card">
            <img src={imgUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{discription}...</p>
              <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
              <a href={newsUrl} target='_blank' rel='noreferrer' className="btn btn-sm btn-primary">Read more</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
} 

export default NewsItem
