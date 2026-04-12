import './App.css'
import { Route, Routes } from 'react-router-dom'
import { NotesProvider } from './context/NotesProvider'
import { AppLayout } from './components/AppLayout'
import { NoteEditPage } from './pages/NoteEditPage'
import { NotesDashboardPage } from './pages/NotesDashboardPage'

function App() {
  return (
    <NotesProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<NotesDashboardPage />} />
          <Route path="notes/:noteId" element={<NoteEditPage />} />
        </Route>
      </Routes>
    </NotesProvider>
  )
}

export default App
