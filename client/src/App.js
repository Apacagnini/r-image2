import React from 'react';
import NavHeader from './components/NavHeader/NavHeader';
import ImgContainer from './components/ImgContainer/ImgContainer';
import Footer from './components/Footer/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.seed = 1;
    this.defaultNumImg = 10;
    this.categoriesList = [];
    this.token = process.env.REACT_APP_API_TOKEN;
    this.state = { activeCategory: 'city night', categories: {}, usedIds: [], photos: {}, apiError: false, loading: false };
  }

  fetchCategories(){
    fetch(process.env.REACT_APP_API_URL+'/categories', { headers: { 'apitoken':this.token } })
        .then(response => response.json())
        .then(json => {this.categoriesList = json.categoriesList})
        .catch( () => this.setState({ apiError: true }) );
  }

  isInCategories(id) {
    return Object.values(this.state.categories).some((category) => (category.availableIds.includes(id)));
  }

  push(category, json) {
    if (Object.keys(json).length === 0) return;
    this.state.categories[category].next_page = json.next_page;
    this.state.categories[category].page = json.page;
    json.photos.forEach(photo => {
      if (this.isInCategories(photo.id) === false) {
        this.state.categories[category].availableIds.push(photo.id);
        this.state.photos[photo.id] = photo;
      }
    })
  }

  pullFromCategory(category, quantity) {
    const availables = () => this.state.categories[category].availableIds.length;
    let slice = quantity < availables() ? quantity : availables();
    let ids = this.state.categories[category].availableIds.splice(-slice);
    this.state.usedIds.push(...ids);
    this.setState({ usedIds: this.state.usedIds });
    this.state.usedIds.push()
    return ids;
  }

  getSrc = (id, type) => {
    return this.state.photos[id].src[type];
  }

  getPhotographer = (id) => {
    return this.state.photos[id].photographer;
  }

  getAlt = (id) => {
    return this.state.photos[id].alt;
  }

  getNextPage(category) {
    return this.state.categories[category].next_page;
  }

  setSeed() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('seed') === true) {
      this.seed = urlParams.get('seed');
    } else {
      this.seed = new Date().getTime() % 10000;
    }
  }

  getJson = async (category, url) => {
    if (this.state.apiError === true) return {};
    this.setState({ loading: true });
    try {
      url = (url === '') ? `${process.env.REACT_APP_API_URL}/search?query=${category.replaceAll(' ', '+')}&seed=${this.seed}` : url;
      let res = await fetch(url, { headers: { 'apitoken':this.token } });
      let json = await res.json();
      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      return json;

    } catch (err) {
      this.setState({ apiError: true });
      setTimeout(() => this.setState({ apiError: false }), 3600000); //wait 1 hour
      let message = err.statusText || "An error occurred";
      console.log(`Error ${err.status}: ${message}`);
      return {};

    } finally {
      setTimeout(() => this.setState({ loading: false }), 500);
    }
  }

  getPhotos = async (category, quantity) => {
    if (!this.state.categories.hasOwnProperty(category)) this.state.categories[category] = { page: 0, next_page: '', availableIds: [] };
    if (this.state.categories[category].availableIds.length < quantity) await this.push(category, await this.getJson(category, this.getNextPage(category)));
    return this.pullFromCategory(category, quantity);
  }

  addToImgContainer = async (category, num_img) => {
    if (this.state.loading === false){
      if (this.state.activeCategory != category){
        this.setState({ activeCategory: category });
      }
      await this.getPhotos(category, num_img);
    }
  }

  goToCategory = (category) => {
    this.setState({ activeCategory: category });
    window.scrollTo(0, document.body.scrollHeight);
  }

  infiniteScroll = () => {
    if (window.scrollY + (window.innerHeight * 1.5) >= document.documentElement.scrollHeight) this.addToImgContainer(this.state.activeCategory, this.defaultNumImg);
  }

  componentDidMount() {
    this.fetchCategories();
    this.setSeed();
    this.addToImgContainer(this.state.activeCategory, 15);
    window.addEventListener('scroll', this.infiniteScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.infiniteScroll);
  }

  render() {
    return (
      <>
        <NavHeader
          activeCategory={this.state.activeCategory}
          categoriesList={this.categoriesList}
          categoriesCallback={this.goToCategory}
          apiError={this.state.apiError}
          token={this.token}
        />
        <ImgContainer
          usedIds={this.state.usedIds}
          getSrc={this.getSrc}
          getPhotographer={this.getPhotographer}
          getAlt={this.getAlt}
        />
        <Footer loading={this.state.loading} />
      </>
    );
  }

}

export default App;