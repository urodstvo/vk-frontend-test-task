import { observer } from 'mobx-react-lite';
import { resultListStore } from '@/store/list';
import { Icon16DeleteOutline } from '@vkontakte/icons';
import { IconButton } from '@vkontakte/vkui';

export const DeleteButton = observer(({ id }: { id: number }) => {
  return (
    <IconButton title='Удалить' onClick={() => resultListStore.delete(id)}>
      <Icon16DeleteOutline />
    </IconButton>
  );
});
