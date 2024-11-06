// eslint-disable-next-line import/extensions
import * as todoService from '../api/todos';

export const deleteTodos = (todoIds: number[]) => {
  const promices = todoIds.map(todoId => todoService.deleteTodo(todoId));

  return Promise.allSettled(promices).then(results => {
    const errors = results.filter(result => result.status === 'rejected');
    const successIds = results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value.id);

    return { errors, successIds };
  });
};
