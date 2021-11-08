'use strict';



const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      top: 0,
      last: 9,
      DataisLoaded: false
  };
}

// ComponentDidMount is used to
// execute the code 
componentDidMount() {
  fetch(
    "https://covid-19-news.p.rapidapi.com/v1/covid?q=covid&lang=en&media=True",
    {
      method: 'GET',
    headers: {
      'x-rapidapi-host': 'covid-19-news.p.rapidapi.com',
      'x-rapidapi-key': 'd82b247df5msh60496cd1428eaadp1a9f6ejsn1cbd579845de'
    }
  })  
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                news: json.articles,
                DataisLoaded: true
            });
            console.log(json);
        }).catch(e=>{
          console.log(e);
        })
  }
  render() {
    const { DataisLoaded, news } = this.state;
    return (
      <div>
         {
                news.map((n) => ( 
                <div className="primary-shadow rounded-md ma-3 pa-2 " key = { n._id } >

                    <h3> { n.title }</h3> 
                   { n.published_date } ,
                    <small>Source:</small> <b>{n.clean_url}</b>
                    <p> { n.summary }..
                    <a href   =  {n.link}>Read More</a> <br />
                    </p>
                    </div>
                ))
            }
      </div>
    );
  }
}

const domContainer = document.querySelector('#covid_news_container');
ReactDOM.render(e(LikeButton), domContainer);