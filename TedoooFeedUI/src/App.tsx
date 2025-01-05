// src/App.tsx
import Feed from "./components/Feed";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Tedooo Feed</h1>
        </div>
      </header>
      <main className="app-main">
        <Feed />
      </main>
    </div>
  );
}

export default App;