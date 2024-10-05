import {ConfigProvider } from 'antd';
import HomePage from './pages/HomePage/HomePage.tsx';

function App() {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#137E6E',
          borderRadius: 5,
          fontSize: 16
        }
      }}
    >
      <main>
        <HomePage/>
      </main>
    </ConfigProvider>
  )
}

export default App
