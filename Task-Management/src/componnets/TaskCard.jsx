import { IconButton, Chip } from '@mui/material';
import { Edit, Delete, CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';

const TaskCard = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={`task-card ${task.status === 'completed' ? 'completed' : ''}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-actions">
          <IconButton
            size="small"
            onClick={() => onToggleStatus(task)}
            color={task.status === 'completed' ? 'success' : 'default'}
          >
            {task.status === 'completed' ? <CheckCircle /> : <RadioButtonUnchecked />}
          </IconButton>
          <IconButton size="small" onClick={() => onEdit(task)} color="primary">
            <Edit />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(task._id)} color="error">
            <Delete />
          </IconButton>
        </div>
      </div>
      <p className="task-description">{task.description}</p>
      <div className="task-footer">
        <span>{formatDate(task.createdAt)}</span>
        <Chip
          label={task.status}
          size="small"
          className={`task-status ${task.status}`}
        />
      </div>
    </div>
  );
};

export default TaskCard;
