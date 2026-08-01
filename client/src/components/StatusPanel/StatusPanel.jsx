import Button from '../Button/Button';
import { UI_STRINGS } from '../../constants/uiStrings';
import './StatusPanel.css';

function StatusPanel({ mode, onRetry }) {
  if (mode === 'loading') {
    return (
      <div className="status-panel" role="status" aria-live="polite">
        <p>{UI_STRINGS.loadingPortfolio}</p>
      </div>
    );
  }

  return (
    <div className="status-panel status-panel--error" role="alert">
      <h1>{UI_STRINGS.loadErrorTitle}</h1>
      <p>{UI_STRINGS.loadErrorBody}</p>
      {onRetry ? <Button onClick={onRetry}>{UI_STRINGS.retry}</Button> : null}
    </div>
  );
}

export default StatusPanel;
