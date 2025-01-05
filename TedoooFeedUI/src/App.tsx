// src/App.tsx
import Feed from "./components/Feed";
import './styles/App.css';
import logoSvg from './assets/logo.svg';
import searchSvg from './assets/search.svg';
import homeSvg from './assets/home.svg';
import messageSvg from './assets/message-circle.svg';
import bellSvg from './assets/bell.svg';

function App() {
  return (
    <div className="app">
      <header className="header">
        <nav className="nav-container">
          <div className="nav-start">
            <img src={logoSvg} alt="Logo" className="logo" />
            <div className="search-container">
              <img src={searchSvg} alt="Search" className="search-icon" />
              <input type="text" placeholder="Search" className="search-input" />
            </div>
          </div>
          <div className="nav-end">
            <button className="nav-button active">
              <img src={homeSvg} alt="Home" />
              <span>Home</span>
            </button>
            <button className="nav-button">
              <img src={messageSvg} alt="Messaging" />
              <span>Messaging</span>
            </button>
            <button className="nav-button">
              <img src={bellSvg} alt="Notifications" />
              <span>Notifications</span>
            </button>
            <div className="profile-image">
              <img src="/api/placeholder/32/32" alt="Profile" />
            </div>
          </div>
        </nav>
      </header>
      <main className="main-content">
        <Feed />
      </main>
    </div>
  );
}

export default App;