import {ConfigProvider } from 'antd';
import HomePage from './pages/HomePage/HomePage.tsx';

function App() {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#137E6E',
          borderRadius: 2
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
