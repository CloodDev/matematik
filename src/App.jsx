import { Button, Col, Row, Form } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [formtype, setFormType] = useState('');
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [c, setC] = useState(0)
  const [ukladData, setUkladData] = useState({})
  const [retval, setRetval] = useState(0)
  const [showResult, setShowResult] = useState(false);


  useEffect(() => {
    let temp = 0
    if (formtype == 'liniowe') {
      if (a === 0) {
        temp = Infinity
      }
      temp = -b / a;
    } else if (formtype == "kwadratowe") {
      let delta = b * b - 4 * a * c;
      if (delta < 0) {
      } else if (delta === 0) {
        temp = -b / (2 * a);
      } else {
        let x1 = (-b + Math.sqrt(delta)) / (2 * a);
        let x2 = (-b - Math.sqrt(delta)) / (2 * a);
        temp = { x1, x2 }
      }
    } else if (formtype == 'logarytmiczne') {
      if (a <= 0 || a === 1) {
      } else if (b <= 0) {
      } else {
        temp = Math.log(b) / Math.log(a);
      }
    } else if (formtype == 'uklad'){
      let D = ukladData[0] * ukladData[3] - ukladData[1] * ukladData[2];
      let Dx = ukladData[4] * ukladData[3] - ukladData[5] * ukladData[2];
      let Dy = ukladData[0] * ukladData[5] - ukladData[1] * ukladData[4];
  
      if (D === 0) {
          if (Dx === 0 && Dy === 0) {
              console.log("Układ ma nieskończenie wiele rozwiązań");
          } else {
              console.log("Układ jest sprzeczny - brak rozwiązań");
          }
      }
  
      let x = Dx / D;
      let y = Dy / D;
      temp = {x,y}
    }
    setRetval(temp)
  }, [a, b, c, ukladData])


  function InputForm() {
    if (showForm) {
      switch (formtype) {
        case 'liniowe':
          return Liniowe();
        case "kwadratowe":
          return Kwadratowe();
        case "logarytmiczne":
          return Logarytmiczne();
        case "uklad":
          return UkladRownan();
        default:
          return <div></div>;
      }
    }

    function UkladRownan() {
      return (
        <div className="InputForm border rounded p-4 mt-4 shadow-sm">
          <Form className="text-center">
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold mb-3">Układ równań liniowych</Form.Label>
              <Row className="mb-3 align-items-center">
                <Col><Form.Control type="number" placeholder="a1" onChange={(e) => setUkladData({...ukladData, 0: parseFloat(e.target.value)})} /></Col>
                <Col className="col-auto px-0 text-center">x +</Col>
                <Col><Form.Control type="number" placeholder="b1" onChange={(e) => setUkladData({...ukladData, 1: parseFloat(e.target.value)})} /></Col>
                <Col className="col-auto px-0 text-center">y =</Col>
                <Col><Form.Control type="number" placeholder="c1" onChange={(e) => setUkladData({...ukladData, 4: parseFloat(e.target.value)})} /></Col>
              </Row>
              <Row className="align-items-center">
                <Col><Form.Control type="number" placeholder="a2" onChange={(e) => setUkladData({...ukladData, 2: parseFloat(e.target.value)})} /></Col>
                <Col className="col-auto px-0 text-center">x +</Col>
                <Col><Form.Control type="number" placeholder="b2" onChange={(e) => setUkladData({...ukladData, 3: parseFloat(e.target.value)})} /></Col>
                <Col className="col-auto px-0 text-center">y =</Col>
                <Col><Form.Control type="number" placeholder="c2" onChange={(e) => setUkladData({...ukladData, 5: parseFloat(e.target.value)})} /></Col>
              </Row>
            </Form.Group>
            <Button variant="primary" type="button" onClick={alertData} className="px-4">
              Rozwiąż
            </Button>
          </Form>
        </div>
      );
    }

    function Logarytmiczne() {
      return (
        <div className="InputForm border rounded p-4 mt-4 shadow-sm">
          <Form className="text-center">
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold mb-3">Równanie Logarytmiczne</Form.Label>
              <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                <span className="fs-5 me-1">log</span>
                <Form.Control 
                  type="number" 
                  placeholder="podstawa (a)" 
                  style={{width: '130px'}} 
                  onChange={(e) => setA(parseFloat(e.target.value))}
                />
                <span className="fs-5 mx-1">(</span>
                <Form.Control 
                  type="number" 
                  placeholder="liczba (b)" 
                  style={{width: '130px'}} 
                  onChange={(e) => setB(parseFloat(e.target.value))}
                />
                <span className="fs-5 ms-1">)</span>
              </div>
              <div className="text-muted mb-3">Oblicza wartość dla: log<sub>a</sub>(b) = x</div>
            </Form.Group>
            <Button variant="primary" type="button" onClick={alertData} className="px-4">
              Rozwiąż
            </Button>
          </Form>
        </div>
      );
    }

    function Kwadratowe() {
      return (
        <div className="InputForm border rounded p-4 mt-4 shadow-sm">
          <Form className="text-center">
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold mb-3">Równanie Kwadratowe</Form.Label>
              <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                <Form.Control 
                  type="number" 
                  placeholder="a" 
                  style={{width: '90px'}} 
                  onChange={(e) => setA(parseFloat(e.target.value))}
                />
                <span className="fs-5">x² +</span>
                <Form.Control 
                  type="number" 
                  placeholder="b" 
                  style={{width: '90px'}} 
                  onChange={(e) => setB(parseFloat(e.target.value))}
                />
                <span className="fs-5">x +</span>
                <Form.Control 
                  type="number" 
                  placeholder="c" 
                  style={{width: '90px'}} 
                  onChange={(e) => setC(parseFloat(e.target.value))}
                />
                <span className="fs-5">= 0</span>
              </div>
              <div className="text-muted mb-3">Format: ax² + bx + c = 0</div>
            </Form.Group>
            <Button variant="primary" type="button" onClick={alertData} className="px-4">
              Rozwiąż
            </Button>
          </Form>
        </div>
      );
    }

    function Liniowe() {
      return (
        <div className="InputForm border rounded p-4 mt-4 shadow-sm">
          <Form className="text-center">
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold mb-3">Równanie Liniowe</Form.Label>
              <div className="d-flex align-items-center justify-content-center gap-3 mb-3">
                <Form.Control 
                  onChange={(e => setA(e.target.value))} 
                  placeholder='Argument A' 
                  style={{maxWidth: '150px'}}
                />
                <span className="fs-5">x +</span>
                <Form.Control 
                  onChange={(e => setB(e.target.value))} 
                  placeholder='Argument B' 
                  style={{maxWidth: '150px'}}
                />
                <span className="fs-5">= 0</span>
              </div>
              <div className="text-muted mb-3">Format: Ax + B = 0</div>
            </Form.Group>
            <Button variant="primary" type="button" onClick={alertData} className="px-4">
              Rozwiąż
            </Button>
          </Form>
        </div>
      );
    }
  }

  function alertData() {
    setShowResult(true)
    setTimeout(() => {
      setShowResult(false);
    }, 10000);
  }

  function handleLiniowe() {
    setFormType('liniowe');
    setShowForm(true);
  }

  function handleKwadrat() {
    setFormType('kwadratowe');
    setShowForm(true);
  }

  function handleLog() {
    setFormType('logarytmiczne');
    setShowForm(true);
  }

  function handleUklad() {
    setFormType('uklad');
    setShowForm(true);
  }

  return (
    <div className="container py-4">
      <div className="mt-4">
        <Row className="mb-4">
          <Col>
            <h1 className="text-center fw-bold">Math.PL</h1>
          </Col>
        </Row>
        <Row className="g-4 justify-content-center">
          <Col xs={12} md={5} className="d-grid">
            <Button variant="primary" size="lg" onClick={handleLiniowe} className="py-3">Równanie Liniowe</Button>
          </Col>
          <Col xs={12} md={5} className="d-grid">
            <Button variant="primary" size="lg" onClick={handleKwadrat} className="py-3">Równanie Kwadratowe</Button>
          </Col>
          <Col xs={12} md={5} className="d-grid">
            <Button variant="primary" size="lg" onClick={handleLog} className="py-3">Równanie Logarytmowe</Button>
          </Col>
          <Col xs={12} md={5} className="d-grid">
            <Button variant="primary" size="lg" onClick={handleUklad} className="py-3">Uklad Równań</Button>
          </Col>
        </Row>
      </div>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={10} lg={8}>
          {InputForm()}
        </Col>
      </Row>
      {Wynik()}
    </div>
  );

  function Wynik() {
    if (showResult){
    return <Row className="justify-content-center mt-4 mb-5">
      <Col xs={12} md={10} lg={8}>
        <div className="border rounded p-4 text-center shadow-sm">
          <h3 className="mb-3 fw-bold">Wynik</h3>
          {formtype && (
            <div className='wynik fs-5'>
              {formtype === 'liniowe' && (
                <p className="mb-0">
                  {retval === Infinity
                    ? "Równanie sprzeczne (brak rozwiązań)"
                    : `x = ${retval}`}
                </p>
              )}

              {formtype === 'kwadratowe' && (
                <p className="mb-0">
                  {retval && typeof retval === 'object'
                    ? `x₁ = ${retval.x1}, x₂ = ${retval.x2}`
                    : retval === 0
                      ? "Brak rozwiązań (delta < 0)"
                      : `x = ${retval}`}
                </p>
              )}

              {formtype === 'logarytmiczne' && (
                <p className="mb-0">
                  {retval
                    ? `x = ${retval}`
                    : "Błędne dane (a ≤ 0 lub a = 1 lub b ≤ 0)"}
                </p>
              )}

              {formtype === 'uklad' && (
                <p className="mb-0">
                  {retval && typeof retval === 'object'
                    ? `x = ${retval.x}, y = ${retval.y}`
                    : "Układ sprzeczny lub nieoznaczony"}
                </p>
              )}
            </div>
          )}
        </div>
      </Col>
    </Row>;
    }
  }
}

export default App;
