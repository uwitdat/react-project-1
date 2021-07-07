import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [suggestions, setSuggestions] = useState([])
  const [users, setUsers] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://reqres.in/api/users')
      const users = res.data.data
      setUsers(users)
    }
    fetchData()
  }, [])

  const onSuggestHangler = (text) => {
    setText(text)
    setSuggestions([])
  }

  const onChangeHandler = (text) => {
    let matches = []
    if (text.length > 0) {
      matches = users.filter(usr => {
        const regex = new RegExp(`${text}`, "gi")
        return usr.email.match(regex)
      })
    }
    setSuggestions(matches)
    setText(text)
  }

  return (
    <div className="App">
      <input type="text" className='col-md-10 input' style={{ marginTop: '3rem' }}
        onChange={(e) => onChangeHandler(e.target.value)}
        value={text}
        onBlur={() => {
          setTimeout(() => {
            setSuggestions([])
          }, 100)
        }}
      />
      {suggestions && suggestions.map((sug, i) => (
        <div key={i} className='suggestion col-md-10 justify-content-md-center'
          onClick={() => onSuggestHangler(sug.email)}
        >{sug.email}
        </div>
      ))}
    </div>
  );
}

export default App;
