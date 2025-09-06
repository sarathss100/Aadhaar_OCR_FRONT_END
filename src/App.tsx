import './App.css'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Main from './Components/Main'

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default App;
