import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Container from './components/Container';
import { Toaster } from 'react-hot-toast';
import {BrowserRouter} from 'react-router-dom';
function App() {
return (
<>
<Toaster/>
<BrowserRouter forceRefresh >
<Header></Header>
<Container></Container>
<Footer></Footer>
</BrowserRouter>
</>
);
}



export default App;