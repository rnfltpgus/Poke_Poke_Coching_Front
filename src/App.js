import styled from 'styled-components';

function App() {
  return (
    <div className='App'>
      <Hello>Hi</Hello>
    </div>
  );
}

export default App;

const Hello = styled.div`
  font-size: 150px;
  background-color: blanchedalmond;
`;
