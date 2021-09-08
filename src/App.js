import { useEffect, useState } from 'react';
import { FaQuestion, FaReact } from 'react-icons/fa';
import './App.css';
import Accordion from './components/Accordion';
import FAQForm from './components/FAQForm';
import ModalForm from './components/ModalForm';

function App() {

  const [url] = useState("https://4000-tan-basilisk-5zgwez3l.ws-us16.gitpod.io/faq");
  //let nombre = "Luis Rodriguez";
  //console.log(nombre.toLowerCase().trim().split(""));

  const [faq, setFaq] = useState([
    /* { id: 1, question: 'Pregunta 1', answer: 'Respuesta a Pregunta 1990' },
    { id: 2, question: 'Pregunta 2', answer: 'Respuesta a Pregunta 2015' },
    { id: 3, question: 'Pregunta 3', answer: 'Respuesta a Pregunta 3468' }, */
  ]);


  const [id, setId] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [search, setSearch] = useState("");

  useEffect(() => {
    getFAQ();
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    if (question.trim() === '') {
      alert("Debe ingresar una pregunta")
      return;
    }
    if (answer.trim() === '') {
      alert("Debe ingresar una respuesta")
      return;
    }

    let fq = {
      //id: faq[faq.length - 1].id + 1,
      question, // question: question,
      answer, // answer: answer,
    }

    //let newFaq = [...faq]; // [...faq].concat(fq)
    //newFaq.push(fq);

    //setFaq(newFaq)
    createFAQ(fq);
    setQuestion("");
    setAnswer("");

  }

  const handleSubmitEdit = e => {
    e.preventDefault();

    if (question.trim() === '') {
      alert("Debe ingresar una pregunta")
      return;
    }
    if (answer.trim() === '') {
      alert("Debe ingresar una respuesta")
      return;
    }

    let fq = {
      //id: faq[faq.length - 1].id + 1,
      question, // question: question,
      answer, // answer: answer,
    }

    updateFAQ(fq, id);
    setId(null);
    setQuestion("");
    setAnswer("");
  }

  const setFAQ = ({ id, question, answer }) => {
    setId(id);
    setQuestion(question);
    setAnswer(answer);
  }

  const getFAQ = () => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        //if(response.status === 404) throw Error("Pagina no encontrada");
        return response.json()
      })
      .then((data) => {
        console.log(data);
        setFaq(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const createFAQ = fq => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fq)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //let newFaq = [...faq]; // [...faq].concat(data)
        //newFaq.push(data);
        //setFaq(newFaq)
        if (data.id) {
          getFAQ();
        }
      })
      .catch((error) => console.log(error))
  }

  const updateFAQ = (fq, id) => {
    fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fq)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //let newFaq = [...faq]; // [...faq].concat(data)
        //newFaq.push(data);
        //setFaq(newFaq)
        if (data.id) {
          getFAQ();
        }
      })
      .catch((error) => console.log(error))
  }

  const deleteFAQ = ({id}) => {
    fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //let newFaq = [...faq]; // [...faq].concat(data)
        //newFaq.push(data);
        //setFaq(newFaq)
       
          getFAQ();
        }
      )
      .catch((error) => console.log(error))
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1><FaReact /> Preguntas Frecuentes<FaQuestion /></h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 pt-5">
            <input type="search" className="form-control" name="search" id="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 py-5">
            <Accordion faq={faq} search={search} setFAQ={setFAQ} deleteFAQ={deleteFAQ} />
          </div>
        </div>
        {
          id === null && (
            <div className="row">
              <div className="col-md-12 py-5">
                <FAQForm
                  handleSubmit={handleSubmit}
                  setQuestion={setQuestion}
                  setAnswer={setAnswer}
                  question={question}
                  answer={answer}
                />
              </div>
            </div>
          )
        }“
      </div>
      <ModalForm
        handleSubmit={handleSubmitEdit}
        setQuestion={setQuestion}
        setAnswer={setAnswer}
        question={question}
        answer={answer}
      />
    </>
  );
}

export default App;
