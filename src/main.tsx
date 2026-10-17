import { hydrateRoot } from 'react-dom/client';
import Aplicacao from './App';
import './index.css';

hydrateRoot(document.getElementById('root')!, <Aplicacao />);
