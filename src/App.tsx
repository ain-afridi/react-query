import './App.css'
import { Routes, Route, Link } from "react-router-dom"
import Home from './components/Home.page'
import SuperHeros from './components/Superheros.page';
import RQSuperHeros from './components/RQSuperheros.page';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools"
import RQSuperhero from './components/RQSuperhero.page';
import ParallelQuery from './components/ParallelQuery.page';
import DynamicParallelQueries from './components/DynamicParallelQueries';
import DependentQuery from './components/DependentQuery.page';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ width: "100%" }}>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/super-heroes">Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-super-heroes">RQ Super Heroes</Link>
            </li>
            <li>
              <Link to="/parallel-query">Parallel Queries</Link>
            </li>
            <li>
              <Link to="/dynamic-parallel-queries">
                Dynamic Parallel Queries
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/super-hero/:heroId" element={<RQSuperhero />} />
          <Route
            path="/dynamic-parallel-queries"
            element={<DynamicParallelQueries heroId={[1, 3]} />}
          />
          <Route
            path="/dependent-query"
            element={<DependentQuery email="vishwas@example.com" />}
          />
          <Route path="/parallel-query" element={<ParallelQuery />} />
          <Route path="/" element={<Home />} />
          <Route path="/super-heroes" element={<SuperHeros />} />
          <Route path="/rq-super-heroes" element={<RQSuperHeros />} />
        </Routes>
      </div>

      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App
